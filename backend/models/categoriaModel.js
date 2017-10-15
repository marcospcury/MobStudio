
const restful = require('node-restful')
const mongoose = restful.mongoose

const CategoriaSchema = new mongoose.Schema({
    Nome: { type: String, required: true },
    Tipo: { type: String, enum: [
        'Produto', 'Serviço'
    ]},
    SubCategoria: [{
        Nome: String
    }]
},
{ bufferCommands: false })

module.exports = restful.model('Categorias', CategoriaSchema)