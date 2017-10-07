'use strict'
const mongoose = require('mongoose')
const Cliente = mongoose.model('Clientes')

exports.listar_todos = (req, res) => {
    Cliente.find({})
        .then(cliente => {
            res.json(cliente)
        })
        .catch(err => {
            res.send(err)
        })
}

exports.criar_cliente = (req, res) => {
    var novo_cliente = new Cliente(req.body)
    novo_cliente.save()
        .then(cliente => {
            res.json(cliente)
        })
        .catch(err => {
            res.send(err)
        })
}

exports.obter_cliente = (req, res) => {
    Cliente.findById(req.params.clienteId)
        .then(cliente => {
            res.json(cliente)
        })
        .catch(err => {
            res.send(err)
        })
}

exports.alterar_cliente = (req, res) => {
    Cliente.findOneAndUpdate({ _id: req.params.clienteId }, req.body, { new: true })
        .then(cliente => {
            res.json(cliente)    
        })
        .catch(err => {
            res.send(err)
        })
}

exports.remover_cliente = function(req, res) {
    Cliente.remove({ _id: req.params.clienteId })
        .then(cliente => { 
            res.json({ msg_erro: 'Cliente excluído com sucesso' })
        })
        .catch(err => {
            res.send(err)
        })
}