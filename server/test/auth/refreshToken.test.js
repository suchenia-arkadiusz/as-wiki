import { getApp } from "../../src/getExpressApp";
import request from "supertest";
import { generateJWT } from "../../src/auth/utils/generateJWT";

describe("API refreshToken", () => {
  let app;

  beforeAll(() => {
    app = getApp();
  });

  it("POST should return 401 if no refresh token is provided", async () => {
    await request(app).get("/refresh").expect(401);
  });

  it("POST should return 401 if refresh token is not valid", async () => {
    await request(app).get("/refresh").set({ "Refresh-Token": "invalid" }).expect(401);
  });

  it("POST should return 200 if token is valid", async () => {
    const validToken = generateJWT(
      {
        id: "id",
        username: "username",
        email: "email",
        firstName: "firstName",
        lastName: "lastName",
      },
      "1d",
    );

    await request(app)
      .get("/refresh")
      .set({ "Refresh-Token": `${validToken}` })
      .expect(200);
  });
});
