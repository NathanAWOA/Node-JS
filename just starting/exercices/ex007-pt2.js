const express = require("express")
const app = express()
const handlebars = require("express-handlebars")
const bodyParser = require('body-parser')
//const Sequelize = require('sequelize')
const Post = require('./models/Post')


// CONFIG
    // TEMPLATE ENGINE
      app.engine('handlebars', handlebars.engine({defaultLayout: 'main',
      //NÃO APARECEU NA HOME SEM ESSA PARTE AQUI:
      runtimeOptions: {
          allowProtoPropertiesByDefault: true,
          allowProtoMethodsByDefault: true,
      },}))

      app.set('view engine', 'handlebars')
    /*
    NOTE: NÃO SEI PQ MAS NÃO RECONHECEU O HANDLEBARS COMO FUNCTION E SÓ RODOU QUANDO COLOQUEI UM .ENGINE
      
    SEGUE UM EXEMPLO DE COMO O VICTOR LIMA FEZ NO VIDEO DELE:
      
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    */ 
    
      

    //BODY-PARSER
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
    
    /*
    CONECTION WITH DATABASE MYSQL
    
    const sequelize = new Sequelize('ex007', 'root', 'password123A$', {
        host: "localhost",
        dialect: 'mysql'
    })
    */

//PATH

    app.get('/', function(req, res){
        Post.findAll({order:[['id', 'DESC']]}).then(function(posts){
            console.log(posts)
            res.render('home', {posts: posts})
        })
    })

    app.get('/cad', function(req, res) {
        res.render('form')
    })

    app.post('/rota', function(req, res) {
        
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }).then(function() {
            res.redirect('/')
            console.log("Post criado com sucesso!")
        }).catch(function(erro) {
            res.send("Ocorreu um erro: " + erro)
        })
        
        /*req.body.titulo
        req.body.conteudo
        
        res.send(`
        Texto: ${req.body.titulo}
        Conteudo: ${req.body.conteudo}
        `)
        */
    })

    app.get('/deletar/:id', function(req, res){
        Post.destroy({where: {'id': req.params.id}}).then(function(){
            res.send("Postagem deletada com sucesso")
        }).catch(function(erro){
            res.send("Está postagem não existe! ")
        })
    })

app.listen(8081, function() {
    console.log("Server running at url http://localhost:8081")
})