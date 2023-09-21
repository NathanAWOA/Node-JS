const db = require('./db')

const Post = db.sequelize.define('postagens', {
    titulo:{
        type: db.Sequelize.STRING
    },
    conteudo: {
        type: db.Sequelize.TEXT
    }
})

module.exports = Post




/*
Post.sync({force: true})

    ESSE COMANDO É PRA SINCRAR COM O BANCO DE DADOS E ASSIM PODER CRIAR ELE POR AQUI, PORÉM PODE DAR RUIM SE ESSE COMANDO CONTINUAR ATIVO NO CÓDIGO ENTÃO É MELHOR DEIXAR ELE COMENTADO OU ATÉ APAGAR ELE DEPOIS QUE RODAR ELE PELA PRIMEIRA VEZ
*/
