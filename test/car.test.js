const request = require("supertest");
const app = require("../server");
const { addCar } = require("../repositories/rent");

describe("Car API Tests", () => {

  describe("Filter & Sort Cars", () => {
    it(" Should return cars filtered by year and sorted by price (ascending)", async () => {
      const res = await request(app).get("/api/rental-cars?year=2018&order=asc");
  
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      res.body.forEach((car) => expect(car.year).toBe(2018));
  
      expect(res.body[0].price_per_day).toBeLessThanOrEqual(res.body[res.body.length - 1].price_per_day);
    });
  
    it(" Should return cars filtered by color and sorted by price (descending)", async () => {
      const res = await request(app).get("/api/rental-cars?color=blue&order=desc");
  
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      res.body.forEach((car) => expect(car.color).toBe("blue"));
  
      expect(res.body[0].price_per_day).toBeGreaterThanOrEqual(res.body[res.body.length - 1].price_per_day);
    });
  
    it("Should return cars filtered by steering type and sorted by price (ascending)", async () => {
      const res = await request(app).get("/api/rental-cars?steering_type=manual&order=asc");
  
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      res.body.forEach((car) => expect(car.steering_type).toBe("manual"));
  
      expect(res.body[0].price_per_day).toBeLessThanOrEqual(res.body[res.body.length - 1].price_per_day);
    });
  
    it(" Should return cars filtered by number of seats and sorted by price (descending)", async () => {
      const res = await request(app).get("/api/rental-cars?number_of_seats=5&order=desc");
  
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      res.body.forEach((car) => expect(car.number_of_seats).toBe(5));
  
      expect(res.body[0].price_per_day).toBeGreaterThanOrEqual(res.body[res.body.length - 1].price_per_day);
    });
  
    it(" Should fail if an invalid sorting order is provided", async () => {
      const res = await request(app).get("/api/rental-cars?order=random");
  
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Invalid order. Use asc or desc");
    });
  
    it("Should fail if an invalid year is provided", async () => {
      const res = await request(app).get("/api/rental-cars?year=invalidYear");
  
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Invalid year. Use a number.");
    });
  
    it("Should fail if an invalid steering type is provided", async () => {
      const res = await request(app).get("/api/rental-cars?steering_type=hydraulic");
  
      expect(res.statusCode).toBe(400);
expect(res.body.message).toBe("Invalid steering type. Use 'manual'or'automatic'");

    });
  
    it("Should return an empty array if no car matches the filters", async () => {
      const res = await request(app).get("/api/rental-cars?year=2030");
  
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(0);
    });
  });
});
