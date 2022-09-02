const express = require('express')
const cors = require('cors')
const { pool } = require('./config')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

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
    .route('/processo')
    .get(controleProcesso.getProcessos)
    .post(controleProcesso.addProcesso)
    .put(controleProcesso.updateProcesso)

app
    .route('/processo/:codigo')
    .get(controleProcesso.getProcessoPorCodigo)
    .delete(controleProcesso.deleteProcesso)    

    
    

app.listen(process.env.PORT || 3002, () => {
    console.log('Servidor está rodando na porta 3002')
})



