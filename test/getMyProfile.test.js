const request = require("supertest");
const app = require("../server");
const jwt = require("jsonwebtoken");
const { connectDB } = require("./../repositories/db"); 

describe("Auth API - Get My Profile", () => {
  let testUser = {
    fullName: "Test User",
    email: "testuser@example.com",
    username: "testuser",
    password: "password123",
  };

  let token;
  let userId;


  beforeAll(async () => {
    const { mongodb, client } = await connectDB();
    try {
      await mongodb.collection("users").deleteOne({ username: testUser.username });
      console.log("🗑️ Deleted existing test user before registering");
    } finally {
      await client.close();
    }

    const res = await request(app).post("/api/register").send(testUser);
     userId = res.body?.user?._id; 

    if (!userId) {
      throw new Error("User ID is missing from the register response!");
    }
    token = jwt.sign(
      { userId: res.body.user._id, username: testUser.username },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );
  });
    afterAll(async () => {
    const { mongodb, client } = await connectDB();
    try {
      await mongodb.collection("users").deleteOne({ _id: userId });
      console.log("🗑️ Test user deleted from database");
    } finally {
      await client.close();
    }
  });

  it("Should return the user profile when authenticated", async () => {
    const res = await request(app)
      .get("/api/my-profile")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("username", "testuser");
    expect(res.body).toHaveProperty("email", "testuser@example.com");
  });

  it("Should fail when no token is provided", async () => {
    const res = await request(app).get("/api/my-profile");

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Access denied. No token provided.");
  });

  it("Should fail when an invalid token is provided", async () => {
    const res = await request(app)
      .get("/api/my-profile")
      .set("Authorization", "Bearer invalidtoken");

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Invalid token");
  });
});
