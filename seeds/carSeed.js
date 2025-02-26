const { connectDB } = require("./../repositories/db"); 
const { ObjectId } = require("mongodb");

const cars = [

    {
      name: "Toyota Corolla",
      price_per_day: 40,
      year: 2020,
      color: "white",
      steering_type: "automatic",
      number_of_seats: 5,
    },
    {
      name: "Pasat",
      price_per_day: 35,
      year: 2020,
      color: "white",
      steering_type: "automatic",
      number_of_seats: 5,
    },
    {
      name: "Honda Civic",
      price_per_day: 45,
      year: 2019,
      color: "black",
      steering_type: "manual",
      number_of_seats: 5,
    },
    {
      name: "Ford Mustang",
      price_per_day: 80,
      year: 2022,
      color: "red",
      steering_type: "automatic",
      number_of_seats: 4,
    },
    {
      name: "BMW 3 Series",
      price_per_day: 100,
      year: 2021,
      color: "blue",
      steering_type: "automatic",
      number_of_seats: 5,
    },
    {
      name: "Mercedes-Benz C-Class",
      price_per_day: 110,
      year: 2023,
      color: "silver",
      steering_type: "automatic",
      number_of_seats: 5,
    },
    {
      name: "Tesla Model 3",
      price_per_day: 90,
      year: 2022,
      color: "white",
      steering_type: "automatic",
      number_of_seats: 5,
    },
    {
      name: "Volkswagen Golf",
      price_per_day: 50,
      year: 2018,
      color: "gray",
      steering_type: "manual",
      number_of_seats: 5,
    },
    {
      name: "Audi A4",
      price_per_day: 95,
      year: 2021,
      color: "black",
      steering_type: "automatic",
      number_of_seats: 5,
    },
    {
      name: "Chevrolet Camaro",
      price_per_day: 85,
      year: 2020,
      color: "yellow",
      steering_type: "manual",
      number_of_seats: 4,
    },
    {
      name: "Jeep Wrangler",
      price_per_day: 70,
      year: 2019,
      color: "green",
      steering_type: "manual",
      number_of_seats: 4,
    },
    {
      name: "Hyundai Elantra",
      price_per_day: 38,
      year: 2017,
      color: "blue",
      steering_type: "automatic",
      number_of_seats: 5,
    },
    {
      name: "Nissan Altima",
      price_per_day: 42,
      year: 2019,
      color: "black",
      steering_type: "automatic",
      number_of_seats: 5,
    },
    {
      name: "Subaru Forester",
      price_per_day: 55,
      year: 2020,
      color: "silver",
      steering_type: "automatic",
      number_of_seats: 5,
    },
    {
      name: "Mazda CX-5",
      price_per_day: 60,
      year: 2021,
      color: "red",
      steering_type: "automatic",
      number_of_seats: 5,
    },
    {
      name: "Kia Sportage",
      price_per_day: 50,
      year: 2019,
      color: "gray",
      steering_type: "manual",
      number_of_seats: 5,
    }
];

async function seedDatabase() {
  const { mongodb, client } = await connectDB();
  try {
    console.log("Deleting existing cars...");
    await mongodb.collection("cars").deleteMany({});

    console.log("Inserting new car data...");
    await mongodb.collection("cars").insertMany(cars);

    console.log("Seeding completed!");
  } catch (error) {
    console.error(" Error seeding database:", error);
  } finally {
    await client.close();
  }
}

module.exports = {
  seedDatabase,
};
