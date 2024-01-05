import { getApp } from "../../src/getExpressApp";
import request from "supertest";
import { generateJWT } from "../../src/auth/utils/generateJWT";
import { getUserByUsername } from "../../src/auth/helpers/getUser";

describe("API createProject", () => {
  let app;

  beforeAll(() => {
    app = getApp();
  });

  it("POST should return 401 if no cookie is provided", async () => {
    const adminUser = await getUserByUsername("admin");
    const validToken = generateJWT(adminUser, "1d");

    await request(app)
      .post("/api/v1/projects")
      .set("Header", [`authorization=${validToken}`])
      .expect(401);
  });

  it("POST should return 401 if no authorization header and no cookie is provided", async () => {
    await request(app).post("/api/v1/projects").expect(401);
  });

  it("POST should return 401 if cookie is not valid", async () => {
    await request(app).post("/api/v1/projects").set("Cookie", ["refreshToken=invalid"]).expect(401);
  });

  it("POST should return 400 if no name is provided", async () => {
    const adminUser = await getUserByUsername("admin");
    const validToken = generateJWT(adminUser, "1d");

    const response = await request(app)
      .post("/api/v1/projects")
      .set("Cookie", [`refreshToken=${validToken}`])
      .set("Header", [`authorization=${validToken}`])
      .send({
        description: "description",
      })
      .expect(400);

    expect(response.body.message).toBe('"name" is required');
  });

  it("POST should return 400 if no description is provided", async () => {
    const adminUser = await getUserByUsername("admin");
    const validToken = generateJWT(adminUser, "1d");

    const response = await request(app)
      .post("/api/v1/projects")
      .set("Cookie", [`refreshToken=${validToken}`])
      .set("Header", [`authorization=${validToken}`])
      .send({
        name: "name",
      })
      .expect(400);

    expect(response.body.message).toBe('"description" is required');
  });

  it("POST should return 400 if there is a wrong parameter", async () => {
    const adminUser = await getUserByUsername("admin");
    const validToken = generateJWT(adminUser, "1d");

    const response = await request(app)
      .post("/api/v1/projects")
      .set("Cookie", [`refreshToken=${validToken}`])
      .set("Header", [`authorization=${validToken}`])
      .send({
        name: "name",
        description: "description",
        wrongParameter: "wrongParameter",
      })
      .expect(400);

    expect(response.body.message).toBe('"wrongParameter" is not allowed');
  });

  it("POST should return 200 if name and description are provided", async () => {
    const adminUser = await getUserByUsername("admin");
    const validToken = generateJWT(adminUser, "1d");

    const response = await request(app)
      .post("/api/v1/projects")
      .set("Cookie", [`refreshToken=${validToken}`])
      .set("Header", [`authorization=${validToken}`])
      .send({
        name: `name-${Date.now()}`,
        description: "description",
        isPublic: false,
        logoUrl: "logoUrl",
      })
      .expect(201);
  });
});
