import { getApp } from "../../src/getExpressApp";
import request from "supertest";
import { generateJWT } from "../../src/auth/utils/generateJWT";

describe("API refreshToken", () => {
  let app;

  beforeAll(() => {
    app = getApp();
  });

  it("POST should return 401 if no cookie is provided", async () => {
    await request(app).post("/refresh").expect(401);
  });

  it("POST should return 401 if cookie is not valid", async () => {
    await request(app).post("/refresh").set("Cookie", ["refreshToken=invalid"]).expect(401);
  });

  it("POST should return 200 if cookie is valid", async () => {
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
      .post("/refresh")
      .set("Cookie", [`refreshToken=${validToken}`])
      .expect(200);
  });
});
