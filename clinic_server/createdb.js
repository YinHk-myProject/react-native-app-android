const express = require('express')
const mysql = require('mysql')

const app = express()
const port = 3000

require('dotenv').config()

// create connection
var db = mysql.createConnection({
    host     : 'localhost',
    user     : process.env.DB_USER,
    password : process.env.DB_PASS
  })


// connect to mysql
db.connect(function(err) {
    if (err) throw err
    console.log("Database Connected!")
})


// create database - 'patient'
const sql_db ="CREATE DATABASE patient"
db.query(sql_db, function (err) {
  if (err) throw err
  console.log("Database created!")
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})



