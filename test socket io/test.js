//EXPRESS
const express = require('express')
const app = express()

//PORTA PARA SER ESCUTADA
const PORT = process.env.PORT || 8081

//SOCKET IO
const socket = require('socket.io')

//HTTP
const http = require('http')
const httpServer = http.createServer(app)
const io = socket(httpServer, {
    path:'/socket.io'
})

//ARRAY PARA GUARDAR OS IDS DOS CLIENTS
const clients = []

//PATH 
    app.use(express.static(__dirname + '/public'))

    app.get('/msg', function(req, res) {
        const msg = req.query.msg || ''

        for(const client of clients){
            client.emit('msg', msg)
        }

        res.json({
            ok: true
        })

        //res.send(`Seja bem vindo a esse site teste`)
    })
//CONNECTION
io.on('connection', (client) =>{
    console.log(`Client connected. Client id: ${client.id}`)
    clients.push(client)


    client.on('disconnect', () => {
        clients.splice(clients.indexOf(client), 1)
    })
})

/* ESTRUTURA THEN/CATCH

.then(function() {
        console.log(`Deu bom`)
    }).catch(function(err) {
        console.log(`Deu ruim: ${err}`)
    })
*/

httpServer.listen(PORT, function(){
    console.log("Server rodando na url http://localhost:8081")
})