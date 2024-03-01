import {getExpressApp} from '../config/getApp';
import {getUserByUsername} from '../../src/auth/helpers/getUser';
import {generateJWT} from '../../src/auth/utils/generateJWT';
import {createProject} from '../testUtils/projectUtils';
import request from 'supertest';
import {createPage} from '../testUtils/pageUtils';
import {deleteProjectById} from '../../src/project/helpers/deleteProject';
import {getUserGroupByName} from '../../src/auth/helpers/getUserGroup';
import {deletePermissionsForPage} from '../../src/pagePermissions/helpers/deletePermissionsFromPage';

describe('API addPermissions', () => {
  let app;

  beforeAll(async () => {
    app = await getExpressApp();
  });

  it('POST should return 500 if something went wrong', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');
    const project = await createProject(app, validToken);

    await request(app)
      .post(`/api/v1/projects/${project.id}/pages/1/permissions`)
      .set({ Authorization: `Bearer ${validToken}` })
      .expect(500);

    await deleteProjectById(project.id);
  });

  it('POST should return 404 if the page does not exist', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');
    const project = await createProject(app, validToken);

    const response = await request(app)
      .post(`/api/v1/projects/${project.id}/pages/8a259698-715c-41fd-9f3d-b1e43f42d265/permissions`)
      .set({ Authorization: `Bearer ${validToken}` })
      .expect(404);

    expect(response.body.message).toBe('Page does not exist');

    await deleteProjectById(project.id);
  });

  it('POST should return 404 if the user does not exist', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');
    const project = await createProject(app, validToken);
    const page = await createPage(app, project, validToken);

    const response = await request(app)
      .post(`/api/v1/projects/${project.id}/pages/${page.id}/permissions`)
      .set({ Authorization: `Bearer ${validToken}` })
      .send({
        userId: '8a259698-715c-41fd-9f3d-b1e43f42d265',
      })
      .expect(404);

    expect(response.body.message).toBe('User does not exist');

    await deleteProjectById(project.id);
  });

  it('POST should return 404 if the group does not exist', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');
    const project = await createProject(app, validToken);
    const page = await createPage(app, project, validToken);

    const response = await request(app)
      .post(`/api/v1/projects/${project.id}/pages/${page.id}/permissions`)
      .set({ Authorization: `Bearer ${validToken}` })
      .send({
        groupId: '8a259698-715c-41fd-9f3d-b1e43f42d265',
      })
      .expect(404);

    expect(response.body.message).toBe('Group does not exist');

    await deleteProjectById(project.id);
  });

  it('POST should return 409 if the user is already added to the page permissions', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');
    const project = await createProject(app, validToken);
    const page = await createPage(app, project, validToken);

    await request(app)
      .post(`/api/v1/projects/${project.id}/pages/${page.id}/permissions`)
      .set({ Authorization: `Bearer ${validToken}` })
      .send({
        userId: adminUser.id,
      });

    await request(app)
      .post(`/api/v1/projects/${project.id}/pages/${page.id}/permissions`)
      .set({ Authorization: `Bearer ${validToken}` })
      .send({
        userId: adminUser.id,
      })
      .expect(409);

    await deletePermissionsForPage(page.id, { userId: adminUser.id });
    await deleteProjectById(project.id);
  });

  it('POST should return 409 if the user is already added to the page permissions', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');
    const userGroup = await getUserGroupByName('ADMIN');
    const project = await createProject(app, validToken);
    const page = await createPage(app, project, validToken);

    await request(app)
      .post(`/api/v1/projects/${project.id}/pages/${page.id}/permissions`)
      .set({ Authorization: `Bearer ${validToken}` })
      .send({
        groupId: userGroup.id,
      });

    await request(app)
      .post(`/api/v1/projects/${project.id}/pages/${page.id}/permissions`)
      .set({ Authorization: `Bearer ${validToken}` })
      .send({
        groupId: userGroup.id,
      })
      .expect(409);

    await deletePermissionsForPage(page.id, { groupId: userGroup.id, });
    await deleteProjectById(project.id);
  });

  it('POST should return 204 if the user is added to the page permissions', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');
    const project = await createProject(app, validToken);
    const page = await createPage(app, project, validToken);

    await request(app)
      .post(`/api/v1/projects/${project.id}/pages/${page.id}/permissions`)
      .set({ Authorization: `Bearer ${validToken}` })
      .send({
        userId: adminUser.id,
      })
      .expect(204);

    await deletePermissionsForPage(page.id, { userId: adminUser.id });
    await deleteProjectById(project.id);
  });

  it('POST should return 204 if the group is added to the page permissions', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');
    const userGroup = await getUserGroupByName('ADMIN');
    const project = await createProject(app, validToken);
    const page = await createPage(app, project, validToken);

    await request(app)
      .post(`/api/v1/projects/${project.id}/pages/${page.id}/permissions`)
      .set({ Authorization: `Bearer ${validToken}` })
      .send({
        groupId: userGroup.id,
      })
      .expect(204);

    await deletePermissionsForPage(page.id, { groupId: userGroup.id });
    await deleteProjectById(project.id);
  });
});
