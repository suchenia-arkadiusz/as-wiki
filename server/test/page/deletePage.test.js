import {getExpressApp} from '../config/getApp';
import request from 'supertest';
import {getUserByUsername} from '../../src/auth/helpers/getUser';
import {generateJWT} from '../../src/auth/utils/generateJWT';
import {deleteProjectById} from '../../src/project/helpers/deleteProject';
import {createProject} from '../testUtils/projectUtils';

describe('API deletePage', () => {
  let app;

  beforeAll(async () => {
    app = await getExpressApp();
  });

  it('DELETE should return 404 if the page id is missing', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');

    const project = await createProject(app, validToken);

    await request(app)
      .delete(`/api/v1/projects/${project.id}/pages/`)
      .set({ Authorization: `Bearer ${validToken}` })
      .expect(404);

    await deleteProjectById(project.id);
  });

  it('DELETE should return 404 if the page does not exist', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');

    const project = await createProject(app, validToken);

    await request(app)
      .delete(`/api/v1/projects/${project.id}/pages/1`)
      .set({ Authorization: `Bearer ${validToken}` })
      .expect(404);

    await deleteProjectById(project.id);
  });

  it('DELETE should return 204 if the page is deleted', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');
    const pageName = `name-${Date.now()}`;

    const project = await createProject(app, validToken);

    const page = (
      await request(app)
        .post(`/api/v1/projects/${project.id}/pages`)
        .set({ Authorization: `Bearer ${validToken}` })
        .send({
          name: pageName,
          content: 'content',
        })
    ).body;

    await request(app)
      .delete(`/api/v1/projects/${project.id}/pages/${page.id}`)
      .set({ Authorization: `Bearer ${validToken}` })
      .expect(204);

    await deleteProjectById(project.id);
  });
});
