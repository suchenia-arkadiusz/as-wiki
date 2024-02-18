import request from 'supertest';
import { generateJWT } from '../../src/auth/utils/generateJWT';
import { getUserByUsername } from '../../src/auth/helpers/getUser';
import { deleteProjectById } from '../../src/project/helpers/deleteProject';
import { getExpressApp } from '../config/getApp';
import expect from 'expect';

describe('API createProject', () => {
  let app;

  beforeAll(async () => {
    app = await getExpressApp();
  });

  it('POST should return 401 if no token is provided', async () => {
    await request(app).post('/api/v1/projects').expect(401);
  });

  it('POST should return 401 if token is not valid', async () => {
    await request(app).post('/api/v1/projects').set({ Authorization: 'invalid' }).expect(401);
  });

  it('POST should return 400 if no name is provided', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');

    const response = await request(app)
      .post('/api/v1/projects')
      .set({ Authorization: `Bearer ${validToken}` })
      .send({
        description: 'description',
      })
      .expect(400);

    expect(response.body.message).toBe('"name" is required');
  });

  it('POST should return 400 if no description is provided', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');

    const response = await request(app)
      .post('/api/v1/projects')
      .set({ Authorization: `Bearer ${validToken}` })
      .send({
        name: 'name',
      })
      .expect(400);

    expect(response.body.message).toBe('"description" is required');
  });

  it('POST should return 400 if there is a wrong parameter', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');

    const response = await request(app)
      .post('/api/v1/projects')
      .set({ Authorization: `Bearer ${validToken}` })
      .send({
        name: 'name',
        description: 'description',
        wrongParameter: 'wrongParameter',
      })
      .expect(400);

    expect(response.body.message).toBe('"wrongParameter" is not allowed');
  });

  it('POST should return 500 if there is a server error', async () => {
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
        })
    ).body;

    const response = await request(app)
      .post('/api/v1/projects')
      .set({ Authorization: `Bearer ${validToken}` })
      .send({
        name: projectName,
        description: 'description',
        isPublic: false,
        logoUrl: 'logoUrl',
      })
      .expect(500);

    expect(response.body.message).toBe('Error creating project');

    await deleteProjectById(createdProject.id);
  });

  it('POST should return 200 if name and description are provided', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');
    const projectName = `name-${Date.now()}`;

    const response = await request(app)
      .post('/api/v1/projects')
      .set({ Authorization: `Bearer ${validToken}` })
      .send({
        name: projectName,
        description: 'description',
        isPublic: false,
        logoUrl: 'logoUrl',
      })
      .expect(200);

    expect(response.body.name).toBe(projectName);
    expect(response.body.id).toBeDefined();

    await deleteProjectById(response.body.id);
  });
});
