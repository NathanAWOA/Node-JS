//IMPORT
    const express  = require('express')
    const app = express()
    const handlebars = require('express-handlebars')
    const bodyParsel = require('body-parser')
    const mongoose = require('mongoose')
    const admin = require('./routes/admin')
    const path = require('path')
    const session = require('express-session')
    const flash = require('connect-flash')
    
//CONFIG
    //SESSÃO
        app.use(session({
            secret: 'xablau',
            resave: true,
            saveUninitialized: true
        }))
        app.use(flash())
    //MIDDLEWARE(intermediador)
        app.use( (req, res, next) => {
            console.log(`Oi eu sou um middleware(intermediario)`)
            //GUARDA AS MENSAGENS DE SUCESSO/ FALHA
            res.locals.success_msg = req.flash('success_msg')
            res.locals.error_msg = req.flash('error_msg')

            //NEXT É PARA NÃO FICAR PRESO NO MIDDLEWARE
            next()
        })

    //BODY-PARSE
        app.use(bodyParsel.urlencoded({extended: true}))
        app.use(bodyParsel.json())
    //HANDLEBARS
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
    //MONGOOSE
        mongoose.Promise = global.Promise
        mongoose.connect('mongodb://localhost/blog-app').then(() => {
            console.log(`Conectado ao mongo`)
        }).catch((err) => {
            console.log(`Erro ao se conectar ao mongo: ${err}`)
        })

    //PUBLIC
        app.use(express.static(path.join(__dirname, 'public')))

        
    
//PATH
app.use('/admin', admin)

//OTHERS
const PORT = 8084
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:8084`)
})