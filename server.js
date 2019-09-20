const express = require('express')

const carRoutes = require('./routes/car_routes.js')

const server = express();

server.use(express.json())

server.use('/api/cars', carRoutes)

server.get('/', (req, res) => {
    res.status(200).json({message: 'welcome'})
})

module.exports = server