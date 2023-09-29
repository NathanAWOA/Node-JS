const localStrategy = require('passport-local')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

//Model de usuario
require('../models/Usuario')
const Usuario = mongoose.model('usuarios')

module.exports = function(passport) {
    passport.use(new localStrategy({usernameField: 'email', passwordField: 'senha'}, (email, senha, done) => {

        Usuario.findOne({email: email}).then((usuarios) => {
            if(!usuarios) {
                return done(null, false, {message: "Esta conta não existe"})
            }

            bcrypt.compare(senha, usuarios.senha, (erro, batem) => {
                if(batem){
                    return done(null, usuarios)
                }else {
                    return done(null, false, {message: "Senha incorreta"})
                }

            })

        })

    }))

    passport.serializeUser((usuarios, done) => {

        done(null, usuarios.id)

    })

    passport.deserializeUser((id,done)=>{
        Usuario.findById(id).then((usuario)=>{
            done(null,usuario)
        }).catch((err)=>{
             done (null,false,{message:'algo deu errado'})
        })
        })

    /*  Mongoose descontinuo as callbacks
        agora é só com try/catch, async/await e promises


        passport.deserializeUser((id, done) => {
            Usuario.findById(id, (err, usuarios) => {
                done(err, usuarios)
            })
        })
    */
}