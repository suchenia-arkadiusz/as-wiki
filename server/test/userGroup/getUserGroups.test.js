import { getUserByUsername } from '../../src/auth/helpers/getUser';
import { generateJWT } from '../../src/auth/utils/generateJWT';
import request from 'supertest';
import { getExpressApp } from '../config/getApp';

describe('API getUserGroups', () => {
  let app;

  beforeAll(async () => {
    app = await getExpressApp();
  });

  it('GET should return 401 if no token is provided', async () => {
    await request(app).get('/api/v1/user-groups').expect(401);
  });

  it('GET should return 401 if token is not valid', async () => {
    await request(app).get('/api/v1/user-groups').set({ Authorization: 'invalid' }).expect(401);
  });

  it('GET should return 200 if token is valid', async () => {
    const adminUser = await getUserByUsername('admin');
    const validToken = generateJWT(adminUser, '1d');

    const response = await request(app)
      .get('/api/v1/user-groups')
      .set({ Authorization: `Bearer ${validToken}` })
      .expect(200);

    expect(response.body.length).toBe(2);
  });
});
