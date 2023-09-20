const Sequelize = require('sequelize')
const sequelize = new Sequelize('ex007', 'root', 'password123A$', {
    host: "localhost",
    dialect: 'mysql'
})

sequelize.authenticate().then(function(){
    console.log("Connect")
}).catch(function(erro){
    console.log("Fail: "+erro)
})

//TEMA 1

const Postagem = sequelize.define(
    'postagens', {
        title: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.TEXT
        }
})

/*Postagem.sync({force: true})

Postagem.create({
    title: "Testando Node.js + Sequelize + MySQL",
    content: "Esses estudos de Node.js estão sendo uma loucura, to aprendendo um monte de coisas além do próprio Node.js"
})
*/

const Usuario = sequelize.define(
    'usuarios', {
        nome: {
            type: Sequelize.STRING
        },
        sobrenome: {
            type: Sequelize.STRING
        },
        idade: {
            type: Sequelize.INTEGER
        },
        email: {
            type: Sequelize.STRING
        }
    }
)

/*
Usuario.sync({force: true})

*/

Usuario.create({
    nome: "Nathan",
    sobrenome: "AWOA",
    idade: 99,
    email: "trilocks2@gmail.com"
})