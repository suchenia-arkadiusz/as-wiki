import request from 'supertest';
import { getUserByUsername } from '../../src/auth/helpers/getUser';
import { generateJWT } from '../../src/auth/utils/generateJWT';
import { getApp } from '../../src/getExpressApp';
import {deletePageById} from '../../src/page/helpers/deletePage';
import {deleteProjectById} from '../../src/project/helpers/deleteProject';

describe('API getPages', () => {
  let app;

  beforeAll(() => {
    app = getApp();
  });

  it('GET should return 401 if no token is provided', async () => {
    await request(app).get('/api/v1/projects/projectId/pages').expect(401);
  });

  it('GET should return 401 if token is not valid', async () => {
    await request(app).get('/api/v1/projects/projectId/pages').set({ Authorization: 'invalid' }).expect(401);
  });

  it('GET should return 200 if token is valid', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');
    const firstPageName = `name-${Date.now()}`;
    const secondPageName = `name-${Date.now()}-1`;

    const project = (
      await request(app)
        .post('/api/v1/projects')
        .set({ Authorization: `Bearer ${validToken}` })
        .send({
          name: `name-${Date.now()}`,
          description: 'description',
          isPublic: false,
          logoUrl: 'logoUrl',
        })
    ).body;

    const firstPage = (
      await request(app)
        .post(`/api/v1/projects/${project.id}/pages`)
        .set({ Authorization: `Bearer ${validToken}` })
        .send({
          name: firstPageName,
          content: 'content',
          projectId: project.id,
        })
    ).body;

    const secondPage = (
      await request(app)
        .post(`/api/v1/projects/${project.id}/pages`)
        .set({ Authorization: `Bearer ${validToken}` })
        .send({
          name: secondPageName,
          content: 'content',
          projectId: project.id,
        })
    ).body;

    const response = await request(app)
      .get(`/api/v1/projects/${project.id}/pages`)
      .set({ Authorization: `Bearer ${validToken}` })
      .expect(200);

    expect(response.body.length).toBeGreaterThanOrEqual(2);

    await deletePageById(firstPage.id);
    await deletePageById(secondPage.id);
    await deleteProjectById(project.id);
  });
});
