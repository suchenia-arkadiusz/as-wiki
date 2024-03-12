import request from 'supertest';

export const createProject = async (app, validToken) => {
  return (
    await request(app)
      .post('/api/v1/projects')
      .set({ Authorization: `Bearer ${validToken}` })
      .send({
        name: `name-${Date.now()}`,
        shortDescription: 'description',
        isPublic: false,
        logoUrl: 'logoUrl',
      })
  ).body;
};
