'use strict';
var mongoose = require('mongoose');
var EnderecoSchema = require('./enderecoModel');
var Schema = mongoose.Schema;

var ClienteSchema = new Schema({
    Nome : String,
    Enderecos: [ { type: EnderecoSchema } ],
    Telefones: {
        Contato: String,
        Celular: String,
        Comercial: String
     },
     Sexo: String,
     Profissao: String,
     Email: String,
     Estilo: String,
     NomeContato: String,
     EnderecoObra: { type: EnderecoSchema }
},
{ bufferCommands: false });

module.exports = mongoose.model('Clientes', ClienteSchema);