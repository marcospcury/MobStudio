module.exports = () => {
    const mongoose = require('mongoose')
    mongoose.Promise = global.Promise
    
    const connection = mongoose.connect(process.env.MOB_DB_PATH, {
        useMongoClient: true,
        authSource: process.env.MOB_AUTH_SOURCE,
        db: { databaseName: process.env.MOB_DB_NAME },
        user: process.env.MOB_DB_USER,
        pass: process.env.MOB_DB_PASSWORD
    })
    connection.on('error', (err) => { 
        console.log(err)
    })
    
    const Cliente = require('../models/clienteModel')
    const Usuario = require('../models/usuarioModel')
}