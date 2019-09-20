const Cars = require('./cars_model')
const db = require('../data/db-config')

describe('cars_model', () => {
    beforeEach(async () => {
        await db('cars').truncate();
      });
    it('should set enviroment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing')
    })
    describe('add', () => {
        const carData = {
            make: 'chevy',
            model: 'silverado',
            passengers: 5,
            color: 'red',
            engine: 'v8'
        }
        it('adds car to db', async () => {
            await Cars.add(carData);
    
            let cars = await db('cars');
    
            expect(cars).toHaveLength(1)
        });
        it('returns newly created car',async () => {
            let car = await Cars.add(carData);

            expect(car).toEqual({"id": 1,"make": "chevy","model": "silverado", "passengers": 5, "color": "red", "engine": "v8"})
        })
    });
});