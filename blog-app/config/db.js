/*Se de fato fossemos conectar ao Heroku, nós poderiamos fazer isso aqui para diferenciar quando estamos em uma maquina de produção ou quando é a maquina de um usuario


    if(precess.env.NODE_ENV == 'production'){
        module.exports  = {mongoURI: "link para o banco de dados com usuario e senha"}
    } else {
        module.exports = {mongoURI://localhost/diretorioDoProjeto}
    }

Depois iria ser necessario importar ele la no arquivo principal do projeto, para isso voce vai fazer o classico:

    const db = require('diretorio e arquivo onde foi feita a confiração acima')

depois você desce até a linha do:

    mongoose.connect() 

e coloca o seguinte

    mongoose.connect(db.mongoURI)

e pronto
*/