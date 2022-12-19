require('dotenv').config()

const isProduction = process.env.NODE_ENV === 'production'
//const isProduction =false

const {Pool} = require('pg')


//28/09const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

//const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`

const connectionString = 'postgres://frngxudyyfvaxb:9823002c34b57b4daca5d0245ef3bd4fce5dfd92bcd2ffeb430575944a785034@ec2-44-209-24-62.compute-1.amazonaws.com:5432/d3im7u02qpgk60'
//const connectionString = 'postgres://qlpkhvlz:YN9u6TIS3U8q1SwaWdqwJo86x9uBM1kZ@kesavan.db.elephantsql.com/qlpkhvlz'


//const connectionString = `postgresql://postgres:adm234@localhost/phoenix_crm`






//console.log('--t-x->' + connectionString )
//  connectionString: isProduction ? process.env.DATABASE_URL: 'postgres://qlpkhvlz:YN9u6TIS3U8q1SwaWdqwJo86x9uBM1kZ@kesavan.db.elephantsql.com/qlpkhvlz'
//  console.log( isProduction )
//  console.log( connectionString )


// Heroku
   const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL: connectionString
    // descomentar para fazer deploy no heroku
    , ssl: {
               rejectUnauthorized: false,
           }
    })

/*
// ElephantSql
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