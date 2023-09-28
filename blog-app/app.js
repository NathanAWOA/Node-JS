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
    require('./models/Postagem')
    const Postagem = mongoose.model('postagens')
    require("./models/Categoria")
    const Categoria = mongoose.model('categorias')
    
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
        app.engine('handlebars', handlebars.engine({
            defaultLayout: 'main',
            //deu erro sem isso
            runtimeOptions: {
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault: true,
        },
}))
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
app.get('/', (req, res) => {
    Postagem.find().lean().populate('categoria').sort({data: 'desc'}).then((postagens) => {
        res.render('index', {postagens: postagens})
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro interno')
        res.redirect("/404")
    })
})

app.get('/postagem/:slug', (req, res) => {
    Postagem.findOne({slug: req.params.slug}).then((postagem) => {
        if(postagem) {
            res.render('postagem/index', {postagem: postagem})
        }else {
            req.flash("error_msg", "Essa postagem não existe")
            res.redirect("/")
        }
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro interno")
        res.redirect("/")
    })
})

app.get('/404', (req, res) => {
    res.send("Erro 404!")
})

app.get('/categorias', (req, res) => {
    Categoria.find().then((categorias) => {
        res.render('categorias/index', {categorias: categorias})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro interno")
        res.redirect("/")
    })
})

app.get('/categorias/:slug', (req, res) => {
    Categoria.findOne({slug: req.params.slug}).then((categoria) => {
        if(categoria){
            Postagem.find({categoria: categoria.id}).then((postagens) => {
                
                res.render('categorias/postagens', {postagens: postagens, categoria: categoria})

            }).catch((err) => {
                req.flash("error_msg", "Houve um erro ao listar os posts!")
                res.redirect("/")
            })
        } else {
            req.flash("error_msg", "Essa categoria não existe")
            res.redirect("/")
        }
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro interno")
        res.redirect("/")
    })
})

app.use('/admin', admin)

//OTHERS
const PORT = 8084
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:8084`)
})