import {getExpressApp} from '../config/getApp';
import {getUserByUsername} from '../../src/auth/helpers/getUser';
import {generateJWT} from '../../src/auth/utils/generateJWT';
import {createProject} from '../testUtils/projectUtils';
import request from 'supertest';
import {deleteProjectById} from '../../src/project/helpers/deleteProject';
import {createPage} from '../testUtils/pageUtils';
import {addPermissionsForPage} from '../../src/pagePermissions/helpers/addPermissionsForPage';
import {getUserGroupByName} from '../../src/auth/helpers/getUserGroup';

describe('API deletePermissions', () => {
  let app;

  beforeAll(async () => {
    app = await getExpressApp();
  });

  it('DELETE should return 500 if something went wrong', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');
    const project = await createProject(app, validToken);

    await request(app)
      .delete(`/api/v1/projects/${project.id}/pages/1/permissions`)
      .set({ Authorization: `Bearer ${validToken}` })
      .expect(500);

    await deleteProjectById(project.id);
  });

  it('DELETE should return 204 if the user permissions are deleted', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');
    const project = await createProject(app, validToken);
    const page = await createPage(app, project, validToken);

    await addPermissionsForPage(page.id, {userId: adminUser.id});

    await request(app)
      .delete(`/api/v1/projects/${project.id}/pages/${page.id}/permissions`)
      .set({ Authorization: `Bearer ${validToken}` })
      .send({
        userId: adminUser.id,
      })
      .expect(204);

    await deleteProjectById(project.id);
  });

  it('DELETE should return 204 if the group permissions are deleted', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');
    const project = await createProject(app, validToken);
    const page = await createPage(app, project, validToken);
    const userGroup = await getUserGroupByName('ADMIN');

    await addPermissionsForPage(page.id, {groupId: userGroup.id});

    await request(app)
      .delete(`/api/v1/projects/${project.id}/pages/${page.id}/permissions`)
      .set({ Authorization: `Bearer ${validToken}` })
      .send({
        groupId: userGroup.id,
      })
      .expect(204);

    await deleteProjectById(project.id);
  });
});
