'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
    Nome: String,
    Email: String,
    Senha: String,
    UltimoAcesso: Date,
    Perfil: String
});

module.exports = mongoose.model('Usuarios', UsuarioSchema)