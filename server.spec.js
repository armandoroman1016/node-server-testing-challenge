const server = require('./server.js')
const request = require('supertest')

describe('server', () => {
    describe('GET /', () => {
        it('returns 200 OK status', () => {
            return request(server)
                .get('/')
                    .then( res => {
                        expect(res.status).toBe(200)
                        expect(res.body).toEqual({message: 'welcome'})
                    })
        })
    })
})