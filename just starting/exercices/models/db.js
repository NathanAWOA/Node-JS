const Sequelize = require('sequelize')

//CONECTION WITH DATABASE MYSQL
const sequelize = new Sequelize('postApp', 'root', 'password123A$', {
    host: "localhost",
    dialect: 'mysql'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}