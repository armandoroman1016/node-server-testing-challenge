const Cars = require("./cars_model");
const db = require("../data/db-config");

describe("cars_model", () => {
    const carData = {
        make: "chevy",
        model: "silverado",
        passengers: 5,
        color: "red",
        engine: "v8"
    };
    beforeEach(async () => {
        await db("cars").truncate();
    });
    // it('should set enviroment to testing', () => {
    //     expect(process.env.DB_ENV).toBe('testing')
    // })
    describe("add", () => {
        it("adds car to db", async () => {
            await Cars.add(carData);

            let cars = await db("cars");

            expect(cars).toHaveLength(1);
        });
        it("returns newly created car", async () => {
            let car = await Cars.add(carData);

            expect(car).toEqual({
                id: 1,
                make: "chevy",
                model: "silverado",
                passengers: 5,
                color: "red",
                engine: "v8"
            });
        });
    });
    describe("remove", () => {
        it("deletes a car", async () => {
            let car = await Cars.add(carData);
            let cars = await db("cars");
            expect(cars).toHaveLength(1);
            await Cars.remove(car.id);
            cars = await db("cars");
            expect(cars).toHaveLength(0);
        });
    });
    describe("find", () => {
        it("gets all cars", async () => {
            let cars = await Cars.find();
            expect(cars).toHaveLength(0);
            await Cars.add(carData);
            cars = await Cars.find();
            expect(cars).toHaveLength(1);
        });
    });
});