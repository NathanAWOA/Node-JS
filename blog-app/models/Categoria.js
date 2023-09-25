const mongoose = require('mongoose')
//ESQUEMA DE ESTRUTURAÇÃO
const Schema = mongoose.Schema

const Categoria = new Schema({
    nome: {
        type: String,
        required: true
    },

    slug: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model('categorias', Categoria)