const {
  addCar,
  getSortedCars,
  getFilteredCars,
} = require("../repositories/rent");

exports.getCars = async (req, res) => {
  try {
    const filters = {};
    const validSteeringType = ["automatic", "manual"];
    const { order, color, year, steering_type, number_of_seats } = req.query;

    if (year) {
      const parsedYear = parseInt(year);
      if (isNaN(parsedYear)) {
        return res.status(400).json({ message: "Invalid year. Use a number." });
      }
      filters.year = parsedYear;
    }
    if (color) {
      filters.color = color;
    }
    if (number_of_seats) {
      const parsedSeats = parseInt(number_of_seats);
      if (isNaN(parsedSeats) || parsedSeats < 1) {
        return res
          .status(400)
          .json({ message: "Invalid number of seats. Must be at least 1" });
      }
      filters.number_of_seats = parsedSeats;
    }

    if (steering_type) {
      const formatedSteeringType = steering_type.toLowerCase();
      if (!validSteeringType.includes(formatedSteeringType)) {
        return res
          .status(400)
          .json({
            message: "Invalid steering type. Use 'manual'or'automatic'",
          });
      }
      filters.steering_type = formatedSteeringType;
    }
    let cars = await getFilteredCars(filters);
    if (order) {
      if (!["asc", "desc"].includes(order.toLowerCase())) {
        return res
          .status(400)
          .json({ message: "Invalid order. Use asc or desc" });
      }
      cars.sort((a, b) =>
        order === "asc"
          ? a.price_per_day - b.price_per_day
          : b.price_per_day - a.price_per_day
      );
    }
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
