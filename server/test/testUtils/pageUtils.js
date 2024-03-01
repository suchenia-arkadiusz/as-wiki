import request from 'supertest';

export const createPage = async (app, project, validToken, parentId = null) => {
  const body = {
    name: `name-${Date.now()}`,
    content: 'content',
  };
  if (parentId) body.parentId = parentId;

  return (
    await request(app)
      .post(`/api/v1/projects/${project.id}/pages`)
      .set({ Authorization: `Bearer ${validToken}` })
      .send(body)
  ).body;
};
