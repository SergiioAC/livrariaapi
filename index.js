const express = require('express')
const cors = require('cors')
const { pool } = require('./config')

//const bodyParser = require('body-parser')
//const morgan = require('morgan')





const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

//app.use(morgan("dev"))
//app.use(bodyParser.urlencoded({ extended : false }))
//app.use(bodyParser.json())

const controleEditora = require('./controladores/editoras')
const controleLivro = require('./controladores/livros')
const controleProcesso = require('./controladores/processos')

app
    .route('/editoras')
    .get(controleEditora.getEditoras)
    .post(controleEditora.addEditora)
    .put(controleEditora.updateEditora)

app
    .route('/editoras/:codigo')
    .get(controleEditora.getEditoraPorCodigo)
    .delete(controleEditora.deleteEditora)

   
app
    .route('/livros')
    .get(controleLivro.getLivros)
    .post(controleLivro.addLivro)
    .put(controleLivro.updateLivro)

app
    .route('/livros/:codigo')
    .get(controleLivro.getLivroPorCodigo)
    .delete(controleLivro.deleteLivro)    

    
    app
    .route('/processos')
    .get(controleProcesso.getProcessos)
    .post(controleProcesso.addProcesso)
    .put(controleProcesso.updateProcesso)

    app
    .route('/processos_Phoenix')
    .get(controleProcesso.getProcessos_Phoenix)
    .put(controleProcesso.updateProcesso_Phoenix)

app
    .route('/processos/:codigo')
    .get(controleProcesso.getProcessoPorCodigo)
    .delete(controleProcesso.deleteProcesso)    

    
//app.post('/webhook-client', async(req, res) => {
//    console.log('Inside Callback hook', req.body)
//    const { data } = req.body
//    await Model.create(data)
//    return res.status(200).end();
//});
        

app.listen(process.env.PORT || 3002, () => {
    console.log('Servidor está rodando na porta 3002')
})



