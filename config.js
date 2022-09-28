require('dotenv').config()

const isProduction = process.env.NODE_ENV === 'production'

const {Pool} = require('pg')


//28/09const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

//const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`
const connectionString = 'postgres://frngxudyyfvaxb:9823002c34b57b4daca5d0245ef3bd4fce5dfd92bcd2ffeb430575944a785034@ec2-44-209-24-62.compute-1.amazonaws.com:5432/d3im7u02qpgk60'
//const connectionString = `postgresql://postgres:adm234@localhost/phoenix_crm`


//console.log('--t-x->' + connectionString )
const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL: connectionString
  // descomentar para fazer deploy no heroku
  , ssl: {
    rejectUnauthorized: false,
  }
})


module.exports = {pool}