const request = require("supertest");
const app = require("../server");

describe("Auth API - Login Tests", () => {
  let testUser = {
    fullName: "erza_Test",
    email: "erzatest@gmail.com",
    username: "erza_test",
    password: "1234567",
  };

  beforeAll(async () => {
    await request(app).post("/api/register").send(testUser);
  });

  it("✅ Should login successfully", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ username: "erza_test", password: "1234567" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it(" Should fail when the username is missing", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ password: "1234567" });

    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toContain("Username is required");
  });

  it("Should fail when the password is missing", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ username: "erza_test" });

    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toContain("Password is required");
  });

  it("Should fail when the username does not exist", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ username: "nonexistent", password: "1234567" });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("User not found");
  });

  it("Should fail when the password is incorrect", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ username: "erza_test", password: "wrongpassword" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("The password is not correct");
  });
});
