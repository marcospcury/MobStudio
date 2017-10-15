const express = require('express')

module.exports = (app) => {
    const router = express.Router()
    app.use('/api', router)
    
    const ClientesApi = require('../controllers/api/clienteController')
    const ProdutosApi = require('../controllers/api/produtoController')
    const FornecedoresApi = require('../controllers/api/fornecedorController')
    const CategoriasApi = require('../controllers/api/categoriaController')
    
    ClientesApi.register(router, '/clientes')
    ProdutosApi.register(router, '/produtos')
    FornecedoresApi.register(router, '/fornecedores')
    CategoriasApi.register(router, '/categorias')
}
