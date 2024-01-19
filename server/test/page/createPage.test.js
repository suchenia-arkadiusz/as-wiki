import { getApp } from "../../src/getExpressApp";
import request from "supertest";
import {getUserByUsername} from "../../src/auth/helpers/getUser";
import {generateJWT} from "../../src/auth/utils/generateJWT";
import {deletePageById} from "../../src/page/helpers/deletePage";
import {deleteProjectById} from "../../src/project/helpers/deleteProject";

describe("API createPage", () => {
  let app;

  beforeAll(() => {
    app = getApp();
  });

  it("POST should return 401 if no token is provided", async () => {
    await request(app).post("/api/v1/pages").expect(401);
  });

  it("POST should return 401 if token is not valid", async () => {
    await request(app).post("/api/v1/pages").set({ Authorization: "invalid" }).expect(401);
  });

  it("POST should return 400 if no name is provided", async () => {
    const adminUser = await getUserByUsername("admin");
    const validToken = generateJWT(adminUser, "1d");

    const response = await request(app)
      .post("/api/v1/pages")
      .set({ Authorization: `Bearer ${validToken}` })
      .send({
        content: "content",
        projectId: "1",
      })
      .expect(400);

    expect(response.body.message).toBe("\"name\" is required");
  });

  it("POST should return 400 if no name is provided", async () => {
    const adminUser = await getUserByUsername("admin");
    const validToken = generateJWT(adminUser, "1d");

    const response = await request(app)
      .post("/api/v1/pages")
      .set({ Authorization: `Bearer ${validToken}` })
      .send({
        name: "test page",
        content: "content",
      })
      .expect(400);

    expect(response.body.message).toBe("\"projectId\" is required");
  });

  it("POST should return 400 if there is a wrong parameter", async () => {
    const adminUser = await getUserByUsername("admin");
    const validToken = generateJWT(adminUser, "1d");

    const response = await request(app)
      .post("/api/v1/pages")
      .set({ Authorization: `Bearer ${validToken}` })
      .send({
        name: "test page",
        content: "content",
        projectId: "1",
        wrongParameter: "wrong",
      })
      .expect(400);

    expect(response.body.message).toBe("\"wrongParameter\" is not allowed");
  });

  it("POST should return 200 if page is created", async () => {
    const adminUser = await getUserByUsername("admin");
    const validToken = generateJWT(adminUser, "1d");
    const pageName = `name-${Date.now()}`;

    const project = (
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
      .post("/api/v1/pages")
      .set({ Authorization: `Bearer ${validToken}` })
      .send({
        name: pageName,
        content: "content",
        projectId: project.id,
      })
      .expect(200);

    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe(pageName);
    expect(response.body.content).toBe("content");
    expect(response.body.projectId).toBe(project.id);

    await deletePageById(response.body.id);
    await deleteProjectById(project.id);
  });
});
