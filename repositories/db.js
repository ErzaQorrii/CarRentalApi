const { MongoClient } = require('mongodb');
require("dotenv").config();

async function connectDB() {
  try{ 
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    const mongodb = client.db(process.env.DB_NAME);

    return {mongodb,client};
  }
  catch (error) {
    console.error(" Connection error:", error);
    throw error;
  }
}


module.exports = {connectDB}