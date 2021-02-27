const express = require('express')
const mysql = require('mysql')

const app = express()
const port = 3000


require('dotenv').config()

// create connection
var db = mysql.createConnection({
    host     : 'localhost',
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : 'patient'
  })


// connect to mysql
db.connect(function(err) {
    if (err) throw err
    console.log("Database Connected!")
})


// create table for clinic consultation record
const sql_record ="CREATE TABLE record (id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,name VARCHAR(255),clinic VARCHAR(255),doctor VARCHAR(255),diagnosis VARCHAR(255),fee VARCHAR(64),date DATE,time TIME)"
db.query(sql_record, function (err) {
  if (err) throw err
  console.log("Table of Consultation record created!")
})


// create table of user account
const sql_user ="CREATE TABLE user (name VARCHAR(255),password VARCHAR(255),address VARCHAR(255),email VARCHAR(64),phone VARCHAR(64))"
db.query(sql_user, function (err) {
  if (err) throw err
  console.log("User account created!")
})


// create table of booking 
const sql_booking ="CREATE TABLE booking (email VARCHAR(64),date DATE,time TIME)"
  db.query(sql_booking, function (err) {
    if (err) throw err
    console.log("Booking table created!")
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
