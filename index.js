const express = require('express')
const cors = require('cors')
const { pool } = require('./config')
const moment = require('moment')
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
    .route('/WebHooks')
    .post(controleProcesso.addProcesso_WebHooks)

    app
    .route('/processos_Phoenix')
    .get(controleProcesso.getProcessos_Phoenix)
//    .put(controleProcesso.updateProcesso_Phoenix)

    app
    .route('/processos_Update_Phoenix/:id,:st,:np')
  //  .get(controleProcesso.getProcessos_Phoenix)
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

//    const mdata = '2022-01-31';
//    const mtime = '08:12 PM';
//    var ydata = mdata+' '+mtime;
//    console.log(ydata); //ser?? mostrado 27/11/2020 22:00:00

//    let databrasilminutos = moment( ydata ).format('DD/MM/YY hh:mm:ss');
//    console.log(databrasilminutos); //ser?? mostrado 27/11/2020 22:00:00

//    console.log(mdata + ' ' + mtime );


//    var xdata = moment()
//console.log( xdata );

//let data = moment();
//console.log(data);


   console.log('Servidor est?? rodando na porta '+(process.env.PORT || 3002))
})



