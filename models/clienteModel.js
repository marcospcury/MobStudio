'use strict';
var mongoose = require('mongoose');
var EnderecoSchema = require('./enderecoModel');
var Schema = mongoose.Schema;

var ClienteSchema = new Schema({
    Nome: { type: String, required: true },
    Enderecos: [ { type: EnderecoSchema } ],
    Telefones: {
        Contato: String,
        Celular: String,
        Comercial: String
     },
     Sexo: String,
     Profissao: String,
     Email: { type: String, required: true },
     Estilo: String,
     NomeContato: String,
},
{ bufferCommands: false });

module.exports = mongoose.model('Clientes', ClienteSchema);