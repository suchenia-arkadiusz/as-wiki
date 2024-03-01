import {getExpressApp} from '../config/getApp';
import {getUserByUsername} from '../../src/auth/helpers/getUser';
import {generateJWT} from '../../src/auth/utils/generateJWT';
import {createProject} from '../testUtils/projectUtils';
import {createPage} from '../testUtils/pageUtils';
import request from 'supertest';
import {deleteProjectById} from '../../src/project/helpers/deleteProject';
import {getUserGroupByName} from '../../src/auth/helpers/getUserGroup';
import {addPermissionsForPage} from '../../src/pagePermissions/helpers/addPermissionsForPage';
import {deletePermissionsForPage} from '../../src/pagePermissions/helpers/deletePermissionsFromPage';

describe('API getPermissions', () => {
  let app;

  beforeAll(async () => {
    app = await getExpressApp();
  });

  it('GET should return 200 if there is no permissions for page', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');
    const project = await createProject(app, validToken);
    const page = await createPage(app, project, validToken);

    const response = await request(app)
      .get(`/api/v1/projects/${project.id}/pages/${page.id}/permissions`)
      .set({ Authorization: `Bearer ${validToken}` })
      .expect(200);

    expect(response.body).toEqual({});

    await deleteProjectById(project.id);
  });

  it('GET should return 200 if there are permissions for page', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');
    const project = await createProject(app, validToken);
    const page = await createPage(app, project, validToken);
    const userGroup = await getUserGroupByName('USER');

    await addPermissionsForPage(page.id, { groupId: userGroup.id });

    const response = await request(app)
      .get(`/api/v1/projects/${project.id}/pages/${page.id}/permissions`)
      .set({ Authorization: `Bearer ${validToken}` })
      .expect(200);

    expect(response.body).toEqual({permissions: [{groupId: userGroup.id, pageId: page.id, userId: null}]});

    await deletePermissionsForPage(page.id, { groupId: userGroup.id });
    await deleteProjectById(project.id);
  });

  it('GET should return 200 if there are permissions for inherited page', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');
    const project = await createProject(app, validToken);
    const firstPage = await createPage(app, project, validToken);
    const secondPage = await createPage(app, project, validToken, firstPage.id);
    const userGroup = await getUserGroupByName('USER');

    await addPermissionsForPage(firstPage.id, { groupId: userGroup.id });

    const response = await request(app)
      .get(`/api/v1/projects/${project.id}/pages/${secondPage.id}/permissions`)
      .set({ Authorization: `Bearer ${validToken}` })
      .expect(200);

    expect(response.body).toEqual({inheritedPermissions: [{groupId: userGroup.id, pageId: firstPage.id, userId: null}]});

    await deletePermissionsForPage(firstPage.id, { groupId: userGroup.id });
    await deleteProjectById(project.id);
  });
});
