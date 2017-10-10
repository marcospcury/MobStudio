const express = require('express')

module.exports = (app) => {
    const router = express.Router()
    app.use('/api', router)
    
    const ClientesApi = require('../controllers/api/clienteController')
    const ProdutosApi = require('../controllers/api/produtoController')
    
    ClientesApi.register(router, '/clientes')
    ProdutosApi.register(router, '/produtos')
}
