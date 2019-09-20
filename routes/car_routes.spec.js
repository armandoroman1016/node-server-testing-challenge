const request = require('supertest')
const server = require('../server.js')
const db = require('../data/db-config')

describe('car_routes.js',() => {
    // expect(true).toBe(true)
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

    describe('GET /', () => {
        it('returns 200 OK', () => {
            request(server)
                .get('/api/cars')
                .then( results => {
                    expect(results).toBeTruthy();
                    expect(results.status).toBe(200)
                })
        });
        it('returns empty array', () => {
            request(server)
                .get('/api/cars')
                .then( results => {
                    expect(results.body.cars.length).toBe(0);
                })
        });
    });
    describe('POST /', () => {
        it('returns new car', async () => {
            const results = await request(server).post('/api/cars').send(carData)
            expect(results).toBeTruthy()
            expect(results.body.car).toEqual({
                "id": 1,
                "make": "chevy",
                "model": "silverado",
                "passengers": 5,
                "color": "red",
                "engine": "v8"
            })

        })
    })
    describe('DELETE /:id', () => {
        it('deletes', async () => {
            let results = await request(server).post('/api/cars').send(carData);
            let carsdb = await db('cars');
            expect(carsdb).toHaveLength(1)
            let id = results.body.car.id
            await request(server).delete(`/api/cars/${id}`)
            carsdb = await db('cars')
            expect(carsdb).toHaveLength(0)
        })
    })
});