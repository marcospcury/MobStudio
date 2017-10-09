const express = require('express')

module.exports = (app) => {
    const router = express.Router()
    app.use('/api', router)
    
    const ClientesApi = require('../controllers/api/clienteController')
    
    ClientesApi.register(router, '/clientes')
}
