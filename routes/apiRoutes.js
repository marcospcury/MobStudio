'use strict';
module.exports = function(app) {
    var cliente = require('../controllers/api/clienteController');
    
    app.route('/api/clientes')
        .get(cliente.listar_todos)
        .post(cliente.criar_cliente);

    app.route('/api/clientes/:clienteId')
        .get(cliente.obter_cliente)
        .put(cliente.alterar_cliente)
        .delete(cliente.remover_cliente);
}
