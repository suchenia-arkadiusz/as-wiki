import {getExpressApp} from '../config/getApp';
import {generateJWT} from '../../src/auth/utils/generateJWT';
import {getUserByUsername} from '../../src/auth/helpers/getUser';
import request from 'supertest';
import {deleteUserByUserName} from '../../src/auth/helpers/deleteUser';
import bcrypt from 'bcryptjs';

describe('API updateUser', () => {
  let app;

  beforeAll(async () => {
    app = await getExpressApp();
  });

  it('PUT should return 401 if current password does not match', async () => {
    await registerUser(app, 'test', 'test@aswiki.com', 'pass1234');
    const user = await getUserByUsername('test');
    const token = generateJWT(user, '1d');

    const response = await request(app)
      .put(`/api/v1/users/${user.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .send({
        username: user.username,
        email: user.email,
        currentPassword: 'wrongPassword',
        newPassword: 'newPassword',
      })
      .expect(401);

    expect(response.body.message).toBe('Invalid password');

    await deleteUserByUserName('test');
  });

  it('PUT should return 200 if user is correctly updated', async () => {
    await registerUser(app, 'test', 'test@aswiki.com', 'pass1234');
    const user = await getUserByUsername('test');
    const token = generateJWT(user, '1d');

    const response = await request(app)
      .put(`/api/v1/users/${user.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .send({
        username: user.username,
        email: user.email,
        firstName: 'new First Name',
        lastName: 'new Last Name',
      })
      .expect(200);
    const updatedUser = await getUserByUsername('test');
    const  { password: _, ...userWithoutPassword } = updatedUser;

    expect(JSON.stringify(response.body)).toEqual(JSON.stringify(userWithoutPassword));

    await deleteUserByUserName('test');
  });

  it('PUT should return 200 and change the user\'s password', async () => {
    await registerUser(app, 'test', 'test@aswiki.com', 'pass1234');
    const user = await getUserByUsername('test');
    const token = generateJWT(user, '1d');

    const response = await request(app)
      .put(`/api/v1/users/${user.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .send({
        username: user.username,
        email: user.email,
        currentPassword: 'pass1234',
        newPassword: 'newPassword',
      })
      .expect(200);
    const updatedUser = await getUserByUsername('test');
    const  { password: _, ...userWithoutPassword } = updatedUser;

    expect(JSON.stringify(response.body)).toEqual(JSON.stringify(userWithoutPassword));
    expect(await bcrypt.compare('newPassword', updatedUser.password));

    await deleteUserByUserName('test');
  });
});

const registerUser = async (app, username, email, password) => {
  return (
    await request(app)
      .post('/register')
      .send({
        password,
        email,
        username,
      })
  ).body;
};
