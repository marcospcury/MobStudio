const restful = require('node-restful')
const mongoose = restful.mongoose

const ProdutoSchema = new mongoose.Schema({
    Fabricante: { type: String, required: true },
    Modelo: { type: String, required: true },
    Nome: { type: String, required: true },
    Descricao: { type: String, required: true },
    TipoMedida: { type: String, required: true,
        enum: ['Tridimensional', 'Linear'] },
    Medidas: {
        Largura: Number,
        Altura: Number,
        Profundidade: Number,
        MetroQuadrado: Number
    },
    Categoria: String,
    SubCategoria: String,
    Foto: String
},
{ bufferCommands: false })

module.exports = restful.model('Produtos', ProdutoSchema)