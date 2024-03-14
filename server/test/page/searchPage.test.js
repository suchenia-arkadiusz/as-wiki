import {getExpressApp} from '../config/getApp';
import {createProject} from '../testUtils/projectUtils';
import {getUserByUsername} from '../../src/auth/helpers/getUser';
import {generateJWT} from '../../src/auth/utils/generateJWT';
import {createPage, createPageWithBody} from '../testUtils/pageUtils';
import request from 'supertest';
import {deleteProjectById} from '../../src/project/helpers/deleteProject';
import expect from 'expect';

describe('API searchPage', () => {
  let app;

  beforeAll(async () => {
    app = await getExpressApp();
  });

  it('GET should return empty array if the search term is empty', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');
    const project = await createProject(app, validToken);
    await createPage(app, project, validToken);
    await createPage(app, project, validToken);

    const response = await request(app)
      .get('/api/v1/pages/search?searchTerm=')
      .set({ Authorization: `Bearer ${validToken}` })
      .expect(200);

    expect(response.body).toEqual([]);

    await deleteProjectById(project.id);
  });

  it('GET should return page that match the search term', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');
    const project = await createProject(app, validToken);
    await createPageWithBody(app, project, validToken, { name: 'test page', content: 'content' });
    const page = await createPageWithBody(app, project, validToken, { name: 'another test page', content: 'content' });

    const response = await request(app)
      .get('/api/v1/pages/search?searchTerm=another')
      .set({ Authorization: `Bearer ${validToken}` })
      .expect(200);

    expect(response.body).toEqual([
      {
        id: page.id,
        name: 'another test page',
        projectId: project.id
      }
    ]);

    await deleteProjectById(project.id);
  });

  it('GET should return pages that match the search term', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');
    const project = await createProject(app, validToken);
    const firstPage = await createPageWithBody(app, project, validToken, { name: 'test page', content: 'content' });
    const secondPage = await createPageWithBody(app, project, validToken, { name: 'another test page', content: 'content' });

    const response = await request(app)
      .get('/api/v1/pages/search?searchTerm=test')
      .set({ Authorization: `Bearer ${validToken}` })
      .expect(200);

    expect(response.body).toEqual([
      {
        id: firstPage.id,
        name: 'test page',
        projectId: project.id
      },
      {
        id: secondPage.id,
        name: 'another test page',
        projectId: project.id
      }
    ]);

    await deleteProjectById(project.id);
  });
});
