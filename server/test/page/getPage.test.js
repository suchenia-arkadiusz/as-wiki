import { generateJWT } from '../../src/auth/utils/generateJWT';
import { getUserByUsername } from '../../src/auth/helpers/getUser';
import request from 'supertest';
import { getExpressApp } from '../config/getApp';
import { getUserGroupByName } from '../../src/auth/helpers/getUserGroup';
import { addPermissionsForPage } from '../../src/pagePermissions/helpers/addPermissionsForPage';
import {deleteProjectById} from '../../src/project/helpers/deleteProject';
import {createPage} from '../testUtils/pageUtils';
import {createProject} from '../testUtils/projectUtils';
import {deletePermissionsForPage} from '../../src/pagePermissions/helpers/deletePermissionsFromPage';

describe('API getPage', () => {
  let app;

  beforeAll(async () => {
    app = await getExpressApp();
  });

  it('GET should return 404 if the page does not exist', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');
    const project = await createProject(app, validToken);

    await request(app)
      .get(`/api/v1/projects/${project.id}/pages/1`)
      .set({ Authorization: `Bearer ${validToken}` })
      .expect(404);

    await deleteProjectById(project.id);
  });

  it('GET should return 403 if user has no access to the page (page access)', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');
    const project = await createProject(app, validToken);
    const page = await createPage(app, project, validToken);
    const userGroup = await getUserGroupByName('USER');

    await addPermissionsForPage(page.id, { groupId: userGroup.id });

    const response = await request(app)
      .get(`/api/v1/projects/${project.id}/pages/${page.id}`)
      .set({ Authorization: `Bearer ${validToken}` })
      .expect(403);

    expect(response.body.message).toBe('Access denied');

    await deletePermissionsForPage(page.id, { groupId: userGroup.id });
    await deleteProjectById(project.id);
  });

  it('GET should return 403 if user has no access to the page (inherited page access)', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');
    const project = await createProject(app, validToken);
    const firstPage = await createPage(app, project, validToken);
    const secondPage = await createPage(app, project, validToken, firstPage.id);
    const userGroup = await getUserGroupByName('USER');

    await addPermissionsForPage(firstPage.id, { groupId: userGroup.id });

    const response = await request(app)
      .get(`/api/v1/projects/${project.id}/pages/${secondPage.id}`)
      .set({ Authorization: `Bearer ${validToken}` })
      .expect(403);

    expect(response.body.message).toBe('Access denied');

    await deletePermissionsForPage(firstPage.id, { groupId: userGroup.id });
    await deleteProjectById(project.id);
  });

  it('GET should return 200 if the page has no permissions', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');
    const project = await createProject(app, validToken);
    const page = await createPage(app, project, validToken);

    await request(app)
      .get(`/api/v1/projects/${project.id}/pages/${page.id}`)
      .set({ Authorization: `Bearer ${validToken}` })
      .expect(200);

    await deleteProjectById(project.id);
  });

  it('GET should return 200 if user has permission to the page (as a user)', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');
    const project = await createProject(app, validToken);
    const page = await createPage(app, project, validToken);

    await addPermissionsForPage(page.id, { userId: adminUser.id });

    await request(app)
      .get(`/api/v1/projects/${project.id}/pages/${page.id}`)
      .set({ Authorization: `Bearer ${validToken}` })
      .expect(200);

    await deletePermissionsForPage(page.id, { userId: adminUser.id });
    await deleteProjectById(project.id);
  });

  it('GET should return 200 if user has permission to the page (as a user group)', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');
    const project = await createProject(app, validToken);
    const page = await createPage(app, project, validToken);
    const userGroup = await getUserGroupByName('ADMIN');

    await addPermissionsForPage(page.id, { groupId: userGroup.id });

    await request(app)
      .get(`/api/v1/projects/${project.id}/pages/${page.id}`)
      .set({ Authorization: `Bearer ${validToken}` })
      .expect(200);

    await deletePermissionsForPage(page.id, { groupId: userGroup.id });
    await deleteProjectById(project.id);
  });
});
