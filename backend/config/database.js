module.exports = () => {
    const mongoose = require('mongoose')
    mongoose.Promise = global.Promise
    
    const connection = mongoose.connect(process.env.MOB_DB_STRING, {
        useMongoClient: true
    })
    connection.on('error', (err) => { 
        console.log(err)
    })
    
    const Usuario = require('../models/usuarioModel')
}