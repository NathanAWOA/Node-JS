const express = require("express")
const app = express()
const handlebars = require("express-handlebars")

const Sequelize = require('sequelize')


// CONFIG
    // TEMPLATE ENGINE
      app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))

      /*
      NOTE: NÃO SEI PQ MAS NÃO RECONHECEU O HANDLEBARS COMO FUNCTION E SÓ RODOU QUANDO COLOQUEI UM .ENGINE
      
      SEGUE UM EXEMPLO DE COMO O VICTOR LIMA FEZ NO VIDEO DELE:
      
      app.engine('handlebars', handlebars({defaultLayout: 'main'}))*/ 

      app.set('view engine', 'handlebars')
    //CONECTION WITH DATABASE MYSQL
    const sequelize = new Sequelize('ex007', 'root', 'password123A$', {
        host: "localhost",
        dialect: 'mysql'
    })

//PATH

    app.get('/cad', function(req, res) {
        res.render('form')
    })

app.listen(8081, function() {
    console.log("Server running at url http://localhost:8081")
})