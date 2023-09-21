const mongoose = require('mongoose')

//SETTING UP THE MONGOOSE
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/databaseWithMongo', {
        //useMongoClient: true
        useNewUrlParser: true
    }).then(function(){
        console.log("MongoDB conectado com sucesso!")
    }).catch(function(erro){
        console.log("Fail: " + erro)
    })

//MODEL - USUARIOS
//DEFINING THE MODEL
const UserSchema = mongoose.Schema({
    
    nome:{
        type: String,
        require: true
    },
    sobrenome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    idade: {
        type: Number,
        require: true
    },
    nacionalidade: {
        type: String
    }
})

mongoose.model('users', UserSchema)

const AddUser = mongoose.model('users')

/*
PROVAVELMENTE IGUAL ERA COM O MYSQL É BOM DEIXAR COMENTADO OU ATÉ APAGAR ESSA FUNÇÃO DE ADICIONAR DADOS PARA NÃO FICAR ADICIONANDO VARIAS VEZES, MAS AINDA NÃO TESTEI ISSO.
*/

/*
new AddUser({
    nome: 'Nathan',
    sobrenome: 'AWOA',
    email: 'trilocks2@gmail.com',
    idade: 9999999,
    nacionalidade: 'Brasileiro'
}).save().then(function() {
    console.log('Funfou de boa, os dados foram salvos com sucesso!')
}).catch(function(erro) {
    console.log('Deu ruim, não foi possivel salvar por causa do erro: ' + erro)
})
*/