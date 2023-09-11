require('dotenv').config()

// Habilitar para Heroku
////29/07/23 
const isProduction = process.env.NODE_ENV === 'production'

//01/08/23 desabilitei const isProduction = 'production'

const {Pool} = require('pg')


//28/09const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
//const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

// Habilitar p/ Heroku
//29/07/23  Habilite em 23/08/23 para o Heroku...



///Apnas mudar Esses dois comandos e mais o SSL para mudar de ambiente ( Em 10/09 )
///apaguei em 10/09 
//const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`   // Habilitada para o Heroku , desabilitada para Localhost
/// essa de baixo é que é a correta
  const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`   // Habilitada para o Heroku , desabilitada para Localhost
/// Essa linha precisa para o LOCALHOST liberei linha abaixo em 10/09          
//const connectionString = `postgresql://postgres:123@localhost:5432/phoenix`                                                                 // Desabilitada para o Heroku , Habilitada para Localhost




//const connectionString = 'postgres://frngxudyyfvaxb:9823002c34b57b4daca5d0245ef3bd4fce5dfd92bcd2ffeb430575944a785034@ec2-44-209-24-62.compute-1.amazonaws.com:5432/d3im7u02qpgk60'

//10/01/23const connectionString = 'postgres://qlpkhvlz:YN9u6TIS3U8q1SwaWdqwJo86x9uBM1kZ@kesavan.db.elephantsql.com/qlpkhvlz' // <- Para produção comentar essa linha

// desabilitado em 01/08/23 




//console.log('--t-x->' + connectionString )
//  connectionString: isProduction ? process.env.DATABASE_URL: 'postgres://qlpkhvlz:YN9u6TIS3U8q1SwaWdqwJo86x9uBM1kZ@kesavan.db.elephantsql.com/qlpkhvlz'
//  console.log( isProduction )
//  console.log( connectionString )




const pool = new Pool({ //connectionString
    connectionString: isProduction ? process.env.DATABASE_URL: connectionString
    // descomentar para fazer deploy no heroku
    //20/08/23 comentei as 3 linhas abaixo - Para o Heroku, as 3 linhas abaixo dvem estar dscomentadas
    , ssl: {
               rejectUnauthorized: false,
           }
    })



// ElephantSql
/*
const credentials = {
  user: "qlpkhvlz",
  host: "kesavan.db.elephantsql.com",
  database: "qlpkhvlz",
  password: "YN9u6TIS3U8q1SwaWdqwJo86x9uBM1kZ",
  //port: 5432,
};
const pool = new Pool( credentials )
*/


module.exports = {pool}