const express = require("express")

const app = express()

app.get("/", function(req, res) {
    res.sendfile(__dirname + "/html/index.html")

    /*
    PARECE QUE FUNCIONARIA SÓ COM O ./DIR/FILE
    MAS TA BOM NÉ
    */
})

app.get("/about", function(req, res) {
    res.sendfile(__dirname + "/html/about.html")
})

app.get("/blog", function(req, res) {
    res.send("Blog")
})

app.get("/hello/:cargo/:nome/:cor", function(req, res) {
    res.send(
        `<h1> Hello ${req.params.nome}</h1>
        <h2> Seu cargo é ${req.params.cargo}</h2>
        <h3> Sua cor favorita é ${req.params.cor}</h3>
        `)

    /*
    O RES.SEND SÓ PODE SER ENVIANDO UMA UNICA VEZ, SE ENVIAR MAIS DE UM IRA DAR ERRO
    */
})


app.listen(8081, function() {
    console.log("SERVIDOR RODANDO NA URL http://localhost:8081")
}) //TEM QUE SER A ÚLTIMA LINHA DO CÓDIGO