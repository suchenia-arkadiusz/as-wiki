import request from 'supertest';
import { getExpressApp } from '../config/getApp';
import { deleteUserByUserName } from '../../src/auth/helpers/deleteUser';
import expect from 'expect';

describe('API registerUser', () => {
  let app;

  beforeAll(async () => {
    app = await getExpressApp();
  });

  it('POST should return 400 if no email is provided', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        password: '123456',
        username: 'test',
      })
      .expect(400);

    expect(response.body.message).toBe('\'Username\', \'Password\' and \'e-mail\' are mandatory!');
  });

  it('POST should return 400 if no password is provided', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        email: 'a@a.com',
        username: 'test',
      })
      .expect(400);

    expect(response.body.message).toBe('\'Username\', \'Password\' and \'e-mail\' are mandatory!');
  });

  it('POST should return 400 if no username is provided', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        password: '123456',
        email: 'a@a.com',
      })
      .expect(400);

    expect(response.body.message).toBe('\'Username\', \'Password\' and \'e-mail\' are mandatory!');
  });

  it('POST should return 409 if user with given username already exists', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        password: '123456',
        email: 'a@a.com',
        username: 'admin',
      })
      .expect(409);

    expect(response.body.message).toBe('User with given username already exists!');
  });

  it('POST should return 409 if user with given email already exists', async () => {
    const testUser = await request(app)
      .post('/register')
      .send({
        password: '123456',
        email: 'test@aswiki.com',
        username: 'test',
      });

    const response = await request(app)
      .post('/register')
      .send({
        password: '123456',
        email: 'test@aswiki.com',
        username: 'test',
      })
      .expect(409);

    expect(response.body.message).toBe('User with given username already exists!');

    await deleteUserByUserName('test');
  });

  it('POST should return 500 if user group does not exist', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        password: '123456',
        email: 'a@a.com',
        username: 'test',
        userGroup: 'NOT_EXISTING_USER_GROUP',
      })
      .expect(500);

    expect(response.body.message).toBe('Cannot create user');
  });

  it('POST should return 200 if user is created', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        password: '123456',
        email: 'a@a.com',
        username: 'test',
      })
      .expect(200);

    expect(response.body.user.username).toBe('test');
    expect(response.body.user.email).toBe('a@a.com');
    expect(response.body.user.id).toBeDefined();

    await deleteUserByUserName('test');
  });

  it('POST should return 200 and assigned user group if user is created', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        password: '123456',
        email: 'a@a.com',
        username: 'test',
        userGroup: 'ADMIN',
      })
      .expect(200);

    expect(response.body.user.username).toBe('test');
    expect(response.body.user.email).toBe('a@a.com');
    expect(response.body.user.userGroups[0].name).toBe('ADMIN');
    expect(response.body.user.id).toBeDefined();

    await deleteUserByUserName('test');
  });

  it('POST should return 200 and \'USER\' as a default user group if user is created', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        password: '123456',
        email: 'a@a.com',
        username: 'test',
      })
      .expect(200);

    expect(response.body.user.username).toBe('test');
    expect(response.body.user.email).toBe('a@a.com');
    expect(response.body.user.userGroups[0].name).toBe('USER');
    expect(response.body.user.id).toBeDefined();

    await deleteUserByUserName('test');
  });
});
