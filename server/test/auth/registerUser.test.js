import request from "supertest";
import { getApp } from "../../src/getExpressApp";
import { deleteUserByUserName } from "../../src/auth/helpers/deleteUser";
import expect from "expect";

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

  it("POST should return 500 if user group does not exist", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        password: "123456",
        email: "a@a.com",
        username: "test",
        userGroup: "NOT_EXISTING_USER_GROUP",
      })
      .expect(500);

    expect(response.body.message).toBe("Cannot create user");
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

    await deleteUserByUserName("test");
  });

  it("POST should return 200 and assigned user group if user is created", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        password: "123456",
        email: "a@a.com",
        username: "test",
        userGroup: "ADMIN",
      })
      .expect(200);

    expect(response.body.username).toBe("test");
    expect(response.body.email).toBe("a@a.com");
    expect(response.body.userGroups[0].name).toBe("ADMIN");
    expect(response.body.id).toBeDefined();

    await deleteUserByUserName("test");
  });

  it("POST should return 200 and 'USER' as a default user group if user is created", async () => {
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
    expect(response.body.userGroups[0].name).toBe("USER");
    expect(response.body.id).toBeDefined();

    await deleteUserByUserName("test");
  });
});
