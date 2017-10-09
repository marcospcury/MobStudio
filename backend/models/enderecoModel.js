const restful = require('node-restful')
const mongoose = restful.mongoose

var EnderecoSchema = new mongoose.Schema({ 
    Rua: String, 
    Numero: Number,
    Complemento: String,
    Bairro: String,
    CEP: String,
    Cidade: String,
    Estado: String
})

module.exports = EnderecoSchema