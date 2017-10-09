const restful = require('node-restful')
const mongoose = restful.mongoose

const EnderecoSchema = require('./enderecoModel')

const ClienteSchema = new mongoose.Schema({
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
{ bufferCommands: false })

module.exports = restful.model('Clientes', ClienteSchema)