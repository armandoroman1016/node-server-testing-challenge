const db = require('../data/db-config.js')

module.exports = {
    add,
    remove,
    find
}

function add(values){
    return db('cars')
    .insert(values)
    .then(([id]) => {
        return db('cars')
        .where({id: id})
        .first()
        .then( car => car)
        .catch( err => err)
    })
}

function remove(id){
    return db('cars')
    .where({id: id})
    .delete();
}

function find(){
    return db('cars');
}