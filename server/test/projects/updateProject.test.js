import { getApp } from "../../src/getExpressApp";
import { getUserByUsername } from "../../src/auth/helpers/getUser";
import { generateJWT } from "../../src/auth/utils/generateJWT";
import request from "supertest";
import { deleteProjectById } from "../../src/projects/helpers/deleteProject";

describe("API updateProject", () => {
  let app;

  beforeAll(() => {
    app = getApp();
  });

  it("PUT should return 401 if no token is provided", async () => {
    await request(app)
      .put("/api/v1/projects")
      .send({
        name: "test",
        description: "test desctiption",
      })
      .expect(401);
  });

  it("PUT should return 401 if token is not valid", async () => {
    await request(app).put("/api/v1/projects").set({ Authorization: "invalid" }).expect(401);
  });

  it("PUT should return 400 if there is a wrong parameter", async () => {
    const adminUser = await getUserByUsername("admin");
    const validToken = generateJWT(adminUser, "1d");

    const createdProject = (
      await request(app)
        .post("/api/v1/projects")
        .set({ Authorization: `Bearer ${validToken}` })
        .send({
          name: `name-${Date.now()}`,
          description: "description",
          isPublic: false,
          logoUrl: "logoUrl",
        })
    ).body;

    const response = await request(app)
      .put(`/api/v1/projects/${createdProject.id}`)
      .set({ Authorization: `Bearer ${validToken}` })
      .send({
        name: "name",
        description: "description",
        wrongParameter: "wrongParameter",
      })
      .expect(400);

    expect(response.body.message).toBe('"wrongParameter" is not allowed');

    await deleteProjectById(createdProject.id);
  });

  it("PUT should return 200 if name and description are provided", async () => {
    const adminUser = await getUserByUsername("admin");
    const validToken = generateJWT(adminUser, "1d");

    const projectName = `name-${Date.now()}`;
    const updatedProjectName = `name-${Date.now()}-updated`;

    const createdProject = (
      await request(app)
        .post("/api/v1/projects")
        .set({ Authorization: `Bearer ${validToken}` })
        .send({
          name: projectName,
          description: "description",
          isPublic: false,
          logoUrl: "logoUrl",
        })
    ).body;

    const response = await request(app)
      .put(`/api/v1/projects/${createdProject.id}`)
      .set({ Authorization: `Bearer ${validToken}` })
      .send({
        name: updatedProjectName,
        description: "description",
      })
      .expect(200);

    expect(response.body.name).toBe(updatedProjectName);
    expect(response.body.id).toBeDefined();

    await deleteProjectById(createdProject.id);
  });
});
