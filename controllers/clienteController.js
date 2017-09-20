'use strict';

var mongoose = require('mongoose');
var Cliente = mongoose.model('Clientes');

exports.listar_todos = function(req, res) {
    Cliente.find({}, function(err, cliente){
        if(err)
            res.send(err);
        res.json(cliente);
    });
};

exports.criar_cliente = function(req, res) {
    var novo_cliente = new Cliente(req.body);
    novo_cliente.save(function(err, cliente) {
        if(err) {
            res.send(err);
        }
        else {
            res.json(cliente);
        }
    });
};

exports.obter_cliente = function(req, res) {
    Cliente.findById(req.params.clienteId, function(err, cliente) {
        if(err)
            res.send(err);
        res.json(cliente);
    });
};

exports.alterar_cliente = function(req, res) {
    Cliente.findOneAndUpdate({ _id: req.params.clienteId }, req.body, { new: true }, function(err, cliente) {
        if(err)
            res.send(err);
        res.json(cliente);
    });
};

exports.remover_cliente = function(req, res) {
    Cliente.remove({ _id: req.params.clienteId }, function(err, cliente) {
        if(err)
            res.send(err);
        res.json({ message: 'Cliente excluído com sucesso' });
    });
};