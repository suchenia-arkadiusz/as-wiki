import { getExpressApp } from '../config/getApp';
import { getUserByUsername } from '../../src/auth/helpers/getUser';
import { generateJWT } from '../../src/auth/utils/generateJWT';
import request from 'supertest';
import {createProject} from '../testUtils/projectUtils';
import {createPage} from '../testUtils/pageUtils';
import {addPermissionsForPage} from '../../src/pagePermissions/helpers/addPermissionsForPage';

describe('API deleteProject', () => {
  let app;

  beforeAll(async () => {
    app = await getExpressApp();
  });

  it('DELETE should return 500 if something went wrong', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');

    await request(app)
      .delete('/api/v1/projects/1')
      .set({ Authorization: `Bearer ${validToken}` })
      .expect(500);
  });

  it('DELETE should return 200 if there is a project with the given id', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');
    const project = await createProject(app, validToken);

    await request(app)
      .delete(`/api/v1/projects/${project.id}`)
      .set({ Authorization: `Bearer ${validToken}` })
      .expect(204);
  });

  it('DELETE should return 204 if the project is deleted with all pages and permissions', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');
    const project = await createProject(app, validToken);
    const page = await createPage(app, project, validToken);
    await addPermissionsForPage(page.id, {userId: adminUser.id});

    await request(app)
      .delete(`/api/v1/projects/${project.id}`)
      .set({ Authorization: `Bearer ${validToken}` })
      .expect(204);
  });
});
