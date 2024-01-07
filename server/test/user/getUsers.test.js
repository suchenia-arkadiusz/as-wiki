import request from "supertest";
import { generateJWT } from "../../src/auth/utils/generateJWT";
import { getUserByUsername } from "../../src/auth/helpers/getUser";
import { getApp } from "../../src/getExpressApp";
import { deleteUserByUserName } from "../../src/auth/helpers/deleteUser";

describe("API getUsers", () => {
  let app;

  beforeAll(() => {
    app = getApp();
  });

  it("GET should return 401 if no cookie is provided", async () => {
    const adminUser = await getUserByUsername("admin");
    const validToken = generateJWT(adminUser, "1d");

    await request(app)
      .get("/api/v1/users")
      .set("Header", [`authorization=${validToken}`])
      .expect(401);
  });

  it("GET should return 401 if cookie is not valid", async () => {
    const adminUser = await getUserByUsername("admin");
    const validToken = generateJWT(adminUser, "1d");

    await request(app)
      .get("/api/v1/users")
      .set("Cookie", ["refreshToken=invalid"])
      .set("Header", [`authorization=${validToken}`])
      .expect(401);
  });

  it("GET should return 200 if cookie is valid", async () => {
    const adminUser = await getUserByUsername("admin");
    const validToken = generateJWT(adminUser, "1d");

    const response = await request(app)
      .get("/api/v1/users")
      .set("Cookie", [`refreshToken=${validToken}`])
      .set("Header", [`authorization=${validToken}`])
      .expect(200);

    expect(response.body.length).toBe(1);
  });

  it("GET should return 200 if cookie is valid and query is provided", async () => {
    const adminUser = await getUserByUsername("admin");
    const validToken = generateJWT(adminUser, "1d");

    await request(app).post("/register").send({
      password: "123456",
      email: "a@a.com",
      username: "test",
    });
    await request(app).post("/register").send({
      password: "123456",
      email: "a1@a.com",
      username: "test-1",
    });

    const response = await request(app)
      .get("/api/v1/users")
      .set("Cookie", [`refreshToken=${validToken}`])
      .set("Header", [`authorization=${validToken}`])
      .expect(200);

    expect(response.body.length).toBe(3);

    await deleteUserByUserName("test");
    await deleteUserByUserName("test-1");
  });
});
