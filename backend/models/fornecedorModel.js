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
     Produtos: [{
        Produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produtos' },
        CodigoFornecedor: { type: String, required: true },
        Valor: Number
     }],
     Email: { type: String, required: true },
     NomeContato: String,
},
{ bufferCommands: false })

module.exports = restful.model('Fornecedores', FornecedorSchema)