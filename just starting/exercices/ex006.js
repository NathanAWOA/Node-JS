const express = require("express")

const app = express()

app.get("/", function(req, res) {
    res.send("Welcome")
})

app.get("/about", function(req, res) {
    res.send("About")
})

app.get("/blog", function(req, res) {
    res.send("Blog")
})




app.listen(8081, function() {
    console.log("SERVIDOR RODANDO NA URL http://localhost:8081")
}) //TEM QUE SER A ÚLTIMA LINHA DO CÓDIGO