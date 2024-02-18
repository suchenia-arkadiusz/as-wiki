import { getExpressApp } from '../config/getApp';
import { deleteProjectById } from '../../src/project/helpers/deleteProject';
import { getUserByUsername } from '../../src/auth/helpers/getUser';
import { generateJWT } from '../../src/auth/utils/generateJWT';
import request from 'supertest';
import expect from 'expect';

describe('deleteProject', () => {
  let app;

  beforeAll(async () => {
    app = await getExpressApp();
  });

  it('should return false if there is no project with the given id', async () => {
    const result = await deleteProjectById('wrongId');

    expect(result).toBe(false);
  });

  it('should return true if there is a project with the given id', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');
    const projectName = `name-${Date.now()}`;

    const response = await request(app)
      .post('/api/v1/projects')
      .set('Cookie', [`refreshToken=${validToken}`])
      .set('Header', [`authorization=${validToken}`])
      .send({
        name: projectName,
        description: 'description',
        isPublic: false,
        logoUrl: 'logoUrl',
      });

    const result = await deleteProjectById(response.body.id);

    expect(result).toBe(true);
  });
});
