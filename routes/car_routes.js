const router = require('express').Router()
const Cars = require('../models/cars_model.js')

router.get('/', (req, res) =>{
    Cars.find()
        .then( cars => {
            res.status(200).json({cars:cars})
        })
        .catch( err => {
            res.status(500).json(err)
        });
})

router.post('/', (req, res) =>{
    const car = req.body
    Cars.add(car)
    .then( car => res.status(201).json({car: car}))
    .catch(err => res.status(500).json(err))
})

router.delete('/:id', (req, res) =>{
    const { id } = req.params
    Cars.remove(id)
    .then(deleted => res.status(204).json(deleted))
    .catch(err => res.status(500).json({message: err}))
})

module.exports = router
