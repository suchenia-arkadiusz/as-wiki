import { getUserByUsername } from "../../src/auth/helpers/getUser";
import { generateJWT } from "../../src/auth/utils/generateJWT";
import request from "supertest";
import { getApp } from "../../src/getExpressApp";

describe("API getUserGroups", () => {
  let app;

  beforeAll(() => {
    app = getApp();
  });

  it("GET should return 401 if no cookie is provided", async () => {
    const adminUser = await getUserByUsername("admin");
    const validToken = generateJWT(adminUser, "1d");

    await request(app)
      .get("/api/v1/user-groups")
      .set("Header", [`authorization=${validToken}`])
      .expect(401);
  });

  it("GET should return 401 if cookie is not valid", async () => {
    const adminUser = await getUserByUsername("admin");
    const validToken = generateJWT(adminUser, "1d");
    await request(app)
      .get("/api/v1/user-groups")
      .set("Cookie", ["refreshToken=invalid"])
      .set("Header", [`authorization=${validToken}`])
      .expect(401);
  });

  it("GET should return 200 if cookie is valid", async () => {
    const adminUser = await getUserByUsername("admin");
    const validToken = generateJWT(adminUser, "1d");

    const response = await request(app)
      .get("/api/v1/user-groups")
      .set("Cookie", [`refreshToken=${validToken}`])
      .set("Header", [`authorization=${validToken}`])
      .expect(200);

    expect(response.body.length).toBe(2);
  });
});
