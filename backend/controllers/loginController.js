'use strict'
var mongoose = require('mongoose')
var Usuario = mongoose.model('Usuarios')
var bcrypt = require('bcryptjs')
var passport = require('passport')

exports.get_login = (req, res) => {
    res.render('login')
}

exports.post_login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next)
}

exports.get_registro = (req, res) => {
    res.render('registro')
}

exports.post_registro = (req, res) => {
    let errors = []

    if(req.body.password != req.body.password_confirm) {
        errors.push({ text: "Senhas não combinam" })
    }
    
    if(errors.length > 0) {
        res.render('registro', {
            errors: errors,
            nome: req.body.nome,
            email: req.body.email,
            password: req.body.password,
            password_confirm: req.body.password_confirm
        })
    } else {
        const novoUsuario = {
            Nome: req.body.nome,
            Email: req.body.email,
            Senha: req.body.password,
            Perfil: "Administrador TI"
        }
        
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(novoUsuario.Senha, salt, (err, hash) => {
                if(err) throw err
                novoUsuario.Senha = hash
                const usuario = new Usuario(novoUsuario)
                usuario.save()
                    .then(user => {
                        req.flash('msg_sucesso', 'Usuário registrado com sucesso')
                        res.redirect('/login')
                    })
                    .catch(err => {
                        throw err
                    })
            }) 
        })
    }
}