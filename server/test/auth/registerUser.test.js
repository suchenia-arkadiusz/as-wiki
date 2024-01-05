import request from "supertest";
import { getApp } from "../../src/getExpressApp";

describe("API registerUser", () => {
  let app;

  beforeAll(() => {
    app = getApp();
  });

  it("POST should return 400 if no email is provided", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        password: "123456",
        username: "test",
      })
      .expect(400);

    expect(response.body.message).toBe("'Username', 'Password' and 'e-mail' are mandatory!");
  });

  it("POST should return 400 if no password is provided", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        email: "a@a.com",
        username: "test",
      })
      .expect(400);

    expect(response.body.message).toBe("'Username', 'Password' and 'e-mail' are mandatory!");
  });

  it("POST should return 400 if no username is provided", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        password: "123456",
        email: "a@a.com",
      })
      .expect(400);

    expect(response.body.message).toBe("'Username', 'Password' and 'e-mail' are mandatory!");
  });

  it("POST should return 409 if user with given username already exists", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        password: "123456",
        email: "a@a.com",
        username: "admin",
      })
      .expect(409);

    expect(response.body.message).toBe("User with given username already exists!");
  });

  it("POST should return 409 if user with given email already exists", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        password: "123456",
        email: "admin@aswiki.com",
        username: "test",
      })
      .expect(409);

    expect(response.body.message).toBe("User with given username already exists!");
  });

  it("POST should return 200 if user is created", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        password: "123456",
        email: "a@a.com",
        username: "test",
      })
      .expect(200);

    expect(response.body.username).toBe("test");
    expect(response.body.email).toBe("a@a.com");
    expect(response.body.id).toBeDefined();
  });
});
