const restful = require('node-restful')
const mongoose = restful.mongoose

const ServicoSchema = new mongoose.Schema({
    Nome: { type: String, required: true },
    Descricao: { type: String, required: true },
    Categoria: String,
    SubCategoria: String
},
{ bufferCommands: false })

module.exports = restful.model('Servicos', ServicoSchema)