import { getExpressApp } from '../config/getApp';
import request from 'supertest';
import { getUserByUsername } from '../../src/auth/helpers/getUser';
import { generateJWT } from '../../src/auth/utils/generateJWT';
import { deleteProjectById } from '../../src/project/helpers/deleteProject';
import { getUserGroupByName } from '../../src/auth/helpers/getUserGroup';

describe('API getProject', () => {
  let app;

  beforeAll(async () => {
    app = await getExpressApp();
  });

  it('GET should return 401 if no token is provided', async () => {
    await request(app).get('/api/v1/projects/1').expect(401);
  });

  it('GET should return 401 if token is not valid', async () => {
    await request(app).get('/api/v1/projects/1').set({ Authorization: 'invalid' }).expect(401);
  });

  it('GET should return 404 if project does not exist', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');

    await request(app)
      .get('/api/v1/projects/1')
      .set({ Authorization: `Bearer ${validToken}` })
      .expect(404);
  });

  it('GET should return 200 if project exists', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');
    const projectName = `name-${Date.now()}`;

    const createdProject = (
      await request(app)
        .post('/api/v1/projects')
        .set({ Authorization: `Bearer ${validToken}` })
        .send({
          name: projectName,
          description: 'description',
          isPublic: false,
          logoUrl: 'logoUrl',
        })
    ).body;

    const response = await request(app)
      .get(`/api/v1/projects/${createdProject.id}`)
      .set({ Authorization: `Bearer ${validToken}` })
      .expect(200);

    expect(response.body.name).toBe(projectName);

    await deleteProjectById(createdProject.id);
  });

  it('GET should return 403 if project exists and user has no permissions', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');
    const userGroup = await getUserGroupByName('USER');
    const projectName = `name-${Date.now()}`;

    const createdProject = (
      await request(app)
        .post('/api/v1/projects')
        .set({ Authorization: `Bearer ${validToken}` })
        .send({
          name: projectName,
          description: 'description',
          isPublic: false,
          logoUrl: 'logoUrl',
          permissions: {
            users: [],
            groups: [userGroup.id],
          },
        })
    ).body;

    await request(app)
      .get(`/api/v1/projects/${createdProject.id}`)
      .set({ Authorization: `Bearer ${validToken}` })
      .expect(403);

    await deleteProjectById(createdProject.id);
  });
});
