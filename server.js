require("dotenv").config();
const cors = require("cors");
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");
const { seedDatabase } = require("./seeds/carSeed.js");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", authRoutes);
app.use("/api", carRoutes);

startServer();

async function startServer() {
  try {
    // Wait for the database seeding to finish
    await seedDatabase();

    const PORT = process.env.PORT;

    if (process.env.NODE_ENV !== "test") {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
  } catch (error) {
    console.error("Error during database seeding:", error);
  }
}

module.exports = app;
