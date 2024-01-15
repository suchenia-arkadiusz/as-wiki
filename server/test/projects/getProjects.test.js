import { getUserByUsername } from "../../src/auth/helpers/getUser";
import { generateJWT } from "../../src/auth/utils/generateJWT";
import request from "supertest";
import { getApp } from "../../src/getExpressApp";
import { deleteProjectById } from "../../src/projects/helpers/deleteProject";

describe("API getProjects", () => {
  let app;

  beforeAll(() => {
    app = getApp();
  });

  it("GET should return 401 if no token is provided", async () => {
    await request(app).get("/api/v1/projects").expect(401);
  });

  it("GET should return 401 if token is not valid", async () => {
    await request(app).get("/api/v1/projects").set({ Authorization: "invalid" }).expect(401);
  });

  it("GET should return 200 if token is valid", async () => {
    const adminUser = await getUserByUsername("admin");
    const validToken = generateJWT(adminUser, "1d");

    const firstProject = (
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

    const secondProject = (
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
      .get("/api/v1/projects")
      .set({ Authorization: `Bearer ${validToken}` })
      .expect(200);

    expect(response.body.length).toBeGreaterThanOrEqual(2);

    await deleteProjectById(firstProject.id);
    await deleteProjectById(secondProject.id);
  });
});
