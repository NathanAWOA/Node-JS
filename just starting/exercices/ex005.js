var http = require('http')

http.createServer(function(req, res) {
    res.end("Welcome to that piece of shit")
}).listen(8081)

console.log("SERVIDOR RODANDO")