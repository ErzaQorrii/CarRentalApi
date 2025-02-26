const bcrypt = require("bcryptjs");
const { connectDB } = require("./db");
const { ObjectId } = require("mongodb");

async function createUser(fullName, email, username, password) {
  const { mongodb, client } = await connectDB();
  try {
    const users = mongodb.collection("users");
    const existingUser = await users.findOne({ username });
    if (existingUser) throw new Error("Username already taken");

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await users.insertOne({
      fullName,
      email,
      username,
      password: hashedPassword,
    });

    return { _id: result.insertedId, fullName, email, username };
  } finally {
    await client.close();
  }
}
async function getUserByUsername(username) {
  const { mongodb, client } = await connectDB();
  try {
    const users = mongodb.collection("users");
    const user = await users.findOne({ username });

    return user;
  } finally {
    await client.close();
  }
}

async function getUserById(userId) {
  if(!ObjectId.isValid(userId))
  {
    throw new Error("Invalid user ID format.");
  }
  const { mongodb, client } = await connectDB();
  try {
    const users = mongodb.collection("users");
    const user = await users.findOne(
      { _id: new ObjectId(userId) },
      { projection: { password: 0 } }
    );

    return user;
  } finally {
    await client.close();
  }
}

module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
};
