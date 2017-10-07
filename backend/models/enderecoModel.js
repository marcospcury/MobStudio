'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var EnderecoSchema = new Schema({ 
    Rua: String, 
    Numero: Number,
    Complemento: String,
    Bairro: String,
    CEP: String,
    Cidade: String,
    Estado: String
})

module.exports = EnderecoSchema