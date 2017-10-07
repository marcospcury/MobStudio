const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Usuario = mongoose.model('Usuarios')

module.exports = function(passport) {
    passport.use(new LocalStrategy({
        usernameField: 'email'
    }, (email, password, done) => {
        Usuario.findOne({ Email: email })
            .then(usuario => {
                if(!usuario) {
                    return done(null, false, { message: 'Email não registrado' })
                }

                bcrypt.compare(password, usuario.Senha, (err, isMatch) => {
                    if(err) throw err
                    if(isMatch) {
                        usuario.UltimoAcesso = Date.now()
                        usuario.save()
                        return done(null, usuario)
                    } else {
                        return done(null, false, { message: 'Senha incorreta' })
                    }
                })
            })
    }))

    passport.serializeUser(function(user, done) {
        done(null, user.id)
      })
      
      passport.deserializeUser(function(id, done) {
        Usuario.findById(id, function(err, user) {
          done(err, user)
        })
      })
}