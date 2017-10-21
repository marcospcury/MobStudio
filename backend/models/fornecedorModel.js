const restful = require('node-restful')
const mongoose = restful.mongoose

const EnderecoSchema = require('./enderecoModel')

const FornecedorSchema = new mongoose.Schema({
    Nome: { type: String, required: true },
    RazaoSocial: { type: String, required: true },
    Enderecos: [ { type: EnderecoSchema } ],
    Tipo: { type: String, required: true },
    Telefones: {
        Celular: String,
        Comercial: String
     },
     Email: { type: String, required: true },
     NomeContato: String,
},
{ bufferCommands: false })

module.exports = restful.model('Fornecedores', FornecedorSchema)