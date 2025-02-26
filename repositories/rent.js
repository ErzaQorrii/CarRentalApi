const { connectDB } = require("./db");

async function getFilteredCars(filters = {}) {
  const { mongodb, client } = await connectDB();
  try {
    const query = {};
    if (filters.year) query.year = parseInt(filters.year);
    if (filters.number_of_seats)
      query.number_of_seats = parseInt(filters.number_of_seats);
    if (filters.color) query.color = filters.color;
    if (filters.steering_type) query.steering_type = filters.steering_type;
    return await mongodb.collection("cars").find(query).toArray();
  } finally {
    await client.close();
  }
}
module.exports = {
  addCar,
  getFilteredCars,
};
