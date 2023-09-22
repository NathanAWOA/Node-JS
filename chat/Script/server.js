//EXPRESS
const express = require('express')
const app = express()

//PORTA
const PORT = process.env.PORT || 8081

//SOCKET.IO
const socket = require('socket.io')

//HTTP
const http = require('http')
const httpServer = http.createServer(app)

//CAMINHO PARA O SOCKET.IO
const io = socket(httpServer, {
    path: '/socket.io'
})

//console.log(io)

//PATH
    const chat = app.use(express.static(__dirname + '/../Page'))
   

//ARRAY PARA CLIENTES
const clients = []

//CONNECTION
io.on('connection', (client) => {
    console.log(`O usuário: ${client.id} acabou de se conectar`)
    clients.push(client)

    client.on('disconneted', () => {
        clients.splice(clients.indexOf(client), 1)
    })
})

//OUVIR PORTA
httpServer.listen(PORT, () => {
    console.log(`Servidor rodando na url: http://localhost:8081`)
})