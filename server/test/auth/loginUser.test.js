import { getApp } from "../../src/getExpressApp";
import request from "supertest";

require("dotenv").config();

describe("API loginUser", () => {
  let app;

  beforeAll(() => {
    app = getApp();
  });

  it("POST should return 401 if username is empty", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        password: "test",
      })
      .expect(401);

    expect(response.body.message).toBe("Invalid username or password");
  });

  it("POST should return 401 if password is empty", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        username: "test",
      })
      .expect(401);

    expect(response.body.message).toBe("Invalid username or password");
  });

  it("POST should return 401 if password is different", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        username: "admin",
        password: "test",
      })
      .expect(401);

    expect(response.body.message).toBe("Invalid username or password");
  });

  it("POST should return 200 if credentials are good", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        username: "admin",
        password: process.env.APP_ADMIN_USER_PASSWORD,
      })
      .expect(200);

    expect(response.body.username).toBe("admin");
    expect(response.body.email).toBe(process.env.APP_ADMIN_USER_EMAIL);
    expect(response.body.id).toBeDefined();
  });

  it("POST should put a JWT token into a cookie", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        username: "admin",
        password: process.env.APP_ADMIN_USER_PASSWORD,
      })
      .expect(200);

    expect(response.header["set-cookie"][1]).toMatch(/jwt=.*/);
  });
});
