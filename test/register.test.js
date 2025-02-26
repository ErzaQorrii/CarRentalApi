const request = require("supertest");
const app = require("../server");
const { connectDB } = require("./../repositories/db"); 
const { ObjectId } = require("mongodb");
const { v4: uuidv4 } = require("uuid");


describe("Auth API - Register Tests", () => {
  let testUser = {
    fullName: "erza_Test",
    email: "erzatest@gmail.com",
    username: "test",
    password: "1234567",
  };
  let userId;
  beforeAll(async () => {
    const { mongodb, client } = await connectDB();
    try {
      await mongodb.collection("users").deleteOne({ username: testUser.username });
    } finally {
      await client.close();
    }
  
    const res = await request(app).post("/api/register").send(testUser);
    
    userId = res.body?.user?._id;
  });
  afterAll(async () => {
    if (!userId) return; 
  
    const { mongodb, client } = await connectDB();
    try {
      await mongodb.collection("users").deleteOne({ _id: new ObjectId(userId) });
    } finally {
      await client.close();
    }
  });

  it("Should register a new user successfully", async () => {
    const res = await request(app)
      .post("/api/register")
      .send({
        fullName: "fiek",
        email: "fiek@example.com",
        username: uuidv4().toString(),
        password: "password1234",
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "User created successfully");
  });

  it("Should fail if username already exists", async () => {
    const res = await request(app)
      .post("/api/register")
      .send(testUser); 

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Username already taken");
    if (res.statusCode !== 400) {
  console.error("🚨 Expected 400, got:", res.statusCode, res.body);
}
  });

  it("Should fail when required fields are missing", async () => {
    const res = await request(app)
      .post("/api/register")
      .send({ email: "test@example.com" });

    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toContain("Full name is required");
    expect(res.body.errors).toContain("Username is required");
    expect(res.body.errors).toContain("Password is required");
  });

  it("Should fail if password is too short", async () => {
    const res = await request(app)
      .post("/api/register")
      .send({
        fullName: "Short Pass",
        email: "shortpass@example.com",
        username: "shortpass",
        password: "123",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toContain("Password should be at least 6 characters");
  });

  it("Should fail if email format is invalid", async () => {
    const res = await request(app)
      .post("/api/register")
      .send({
        fullName: "Invalid Email",
        email: "invalidemail",
        username: "invalidemail",
        password: "password123",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toContain("Invaild email format");
  });
});
