const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Usuario')
const Usuario = mongoose.model('usuarios')
const bcrypt = require('bcryptjs')
const passport = require('passport')

router.get('/registro', (req, res) => {
    res.render('usuarios/registro')
})

router.post('/registro', (req, res) => {
    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: 'Nome inválido'})
    }

    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto: 'Email inválido'})
    }

    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push({texto: 'Senha inválida'})
    }

    if(req.body.senha.length < 8){
        erros.push({texto: 'A senha precisa ter no minimo 8 caracteres'})
    }

    if(req.body.senha != req.body.confirmarSenha){
        erros.push({texto: 'As senhas são diferentes, tente novamente!'})
    }

    if(erros.length > 0){

        res.render('usuarios/registro', {erros: erros})

    }else {

        Usuario.findOne({email: req.body.email}).then((usuario) =>  {
            if(usuario){
                req.flash("error_msg", "O email já existe!")
                res.redirect('usuarios/registro')
            }else {
                const novoUsuario = new Usuario({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha,
                    
                    /*
                    precisaria fazer o eAdmin passar a ter o valor de um para que alguem pudesse acessar a parte de adm, mas ainda teria que ver a melhor forma de implementar isso

                    eAdmin: 1
                    */
                })

                bcrypt.genSalt(10,(erro, salt) => {
                    bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                        if(erro){
                            req.flash("error_msg", "Houve um erro durante a criação do usuario")
                            res.redirect('/')
                        }

                        novoUsuario.senha = hash

                        novoUsuario.save().then(() => {
                            req.flash("success_msg", "Usuario criado com sucesso!")
                        }).catch((err) => {
                            req.flash("error_msg", "Houve um erro ao criar o usuario,tente novamente!")
                            res.redirect('usuarios/registro')
                        })
                    })
                })

                req.flash("success_msg", "Email criado com sucesso!")
                res.redirect('/usuarios/registro')
            }

        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno")
            res.redirect('/')
        })

    }
})

router.get('/login', (req, res) => {
    res.render('usuarios/login', {})
})

router.post('/login' , (req, res, next) => {

    passport.authenticate("local", {
        successRedirect: '/',
        failureRedirect:'/usuarios/login',
        failureFlash: true
    })(req, res, next)

})
/*
router.get('/logout', (req, res) => {
    req.logOut()
    req.flash("success_msg", "Deslogado com sucesso!")
    res.redirect('/')
})
*/

router.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash("success_msg", "Deslogado com sucesso!")
      res.redirect('/');
    });
  });


module.exports = router