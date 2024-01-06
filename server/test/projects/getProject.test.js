import { getApp } from "../../src/getExpressApp";
import request from "supertest";
import { getUserByUsername } from "../../src/auth/helpers/getUser";
import { generateJWT } from "../../src/auth/utils/generateJWT";
import { deleteProjectById } from "../../src/projects/helpers/deleteProject";

describe("API getProject", () => {
  let app;

  beforeAll(() => {
    app = getApp();
  });

  it("GET should return 401 if no cookie is provided", async () => {
    const adminUser = await getUserByUsername("admin");
    const validToken = generateJWT(adminUser, "1d");

    await request(app)
      .get("/api/v1/projects/1")
      .set("Header", [`authorization=${validToken}`])
      .expect(401);
  });

  it("GET should return 401 if cookie is not valid", async () => {
    const adminUser = await getUserByUsername("admin");
    const validToken = generateJWT(adminUser, "1d");

    await request(app)
      .get("/api/v1/projects/1")
      .set("Cookie", ["refreshToken=invalid"])
      .set("Header", [`authorization=${validToken}`])
      .expect(401);
  });

  it("GET should return 404 if project does not exist", async () => {
    const adminUser = await getUserByUsername("admin");
    const validToken = generateJWT(adminUser, "1d");

    await request(app)
      .get("/api/v1/projects/1")
      .set("Cookie", [`refreshToken=${validToken}`])
      .set("Header", [`authorization=${validToken}`])
      .expect(404);
  });

  it("GET should return 200 if project exists", async () => {
    const adminUser = await getUserByUsername("admin");
    const validToken = generateJWT(adminUser, "1d");
    const projectName = `name-${Date.now()}`;

    const createdProject = (
      await request(app)
        .post("/api/v1/projects")
        .set("Cookie", [`refreshToken=${validToken}`])
        .set("Header", [`authorization=${validToken}`])
        .send({
          name: projectName,
          description: "description",
          isPublic: false,
          logoUrl: "logoUrl",
        })
    ).body;
    const response = await request(app)
      .get(`/api/v1/projects/${createdProject.id}`)
      .set("Cookie", [`refreshToken=${validToken}`])
      .set("Header", [`authorization=${validToken}`])
      .expect(200);

    expect(response.body.name).toBe(projectName);

    await deleteProjectById(createdProject.id);
  });
});
