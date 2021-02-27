const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const bcrypt = require('bcrypt')
const mysql = require('mysql')

require('dotenv').config()

const port = 5000
const saltRounds = 10

var currentUser = ''
var username = '' 

app.use(cors())

app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )
app.use(bodyParser.json())

// declare globral variable and assign initial value to it
var bookingDate = ''
var bookingTime = ''


// create connection
var db = mysql.createConnection({
  host     : 'localhost',
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : 'patient'
})

// then connect to mysql
db.connect(function(err) {
  if (err) throw err
  console.log("Database Connected!")
})



//basic route for the server
app.get('/', (req, res) => {

  res.send('Hello World!')
  console.log('server is running')
})


// handle login
app.post('/login', function(req,res){
   res.status(200)
   const Email = req.body.email
   const Password = req.body.password
   //console.log(Email)

   //authenticate login
   db.query('SELECT * FROM user WHERE email = ?',[Email], 
      async function (err, results, fields){
        if (err) { console.log(err)
          res.send({ "code":400,"message":"error ocurred"})
         }else{ //console.log(results.length)
                if(results.length >0){
                  const comparision = await bcrypt.compare(Password, results[0].password)
                  if(comparision){ //console.log("login sucessfull")
                  //change currentUser to this account 
                  currentUser = Email
                  res.send({"code":200,"message":"login sucessfull"}) 
                  const sql ="SELECT name FROM user WHERE email = ?"

                  db.query(sql, [currentUser],async function (err,results, fields){
                    if (err) { console.log(err)
                      res.send({ "code":400,"message":"error ocurred"})}
                    else { username = results[0].name}})
                           console.log(username)}
                  else{ //console.log("Email and password does not match")
                  res.send({"code":204,"message":"Email and password does not match"}) }
                }else { //console.log("Email does not exits")
                  res.send({"code":206,"message":"Email does not exits" })
              }
        } 
      })

            
    


})


// handle account registration
app.post('/registration', function(req,res){
  res.status(200)
  console.log(req.body)
  var Name = req.body.name
  var Userpassword = req.body.userpassword
  var Address = req.body.address
  var Email = req.body.email
  var Phone = req.body.phone
  
  bcrypt.hash(Userpassword, saltRounds).then(function (hash){
    //console.log(hash)
    var encryptedPW = hash
    var users = [[Name,encryptedPW,Address,Email,Phone]]

    //Check whether the email was used to register for an account
    db.query('SELECT * FROM user WHERE email = ?',[Email], 
       async function (err, results, fields){
        if (err) { console.log(err)
          res.send({ "code":400,"message":"error ocurred"})}
        else{ if(results.length!=0){ console.log("Account has already exist")
                res.send({"message":"Account has already exist"})} 
              else{
                const sql="INSERT INTO user (name,password,address,email,phone) VALUES ?"
                db.query(sql,[users], function (err) {
                 if (err) throw err
                 console.log("Account created")
                 res.send({"message":"Account created"})
                })
              }
            
            }


       })

  })

})


// handle update account info
app.post('/update', function(req,res){
  res.status(200)
  const newPw = req.body.NewPW
  const newName = req.body.NewName
  const newPhone = req.body.NewPhone

  // hash password before update to database
  bcrypt.hash(newPw, saltRounds).then(function (hash){
    var newEncryptedpw = hash
    
  const updatePw = [newEncryptedpw, currentUser]
  const updateName = [newName, currentUser]
  const updatePhone = [newPhone, currentUser]
  
  const sql_newPw = `UPDATE user
                     SET password = ?
                     WHERE email = ?`
  
  const sql_newName = `UPDATE user
                       SET name = ?
                       WHERE email = ?`

  const sql_newPhone = `UPDATE user
                        SET phone = ?
                        WHERE email = ?`                    
                     
  if(newPw!='') {
    db.query(sql_newPw, updatePw,async function (err){
      if (err) { console.log(err)
        res.send({ "code":400,"message":"error ocurred"})}
      else res.send({ "code":200,"message":"successful update"})
    })
  } if(newName!='') {
    db.query(sql_newName, updateName,async function (err){
      if (err) { console.log(err)
        res.send({ "code":400,"message":"error ocurred"})}
      else {res.send({ "code":200,"message":"successful update"})
             username=newName}
    })
  } if(newPhone!='') {
    db.query(sql_newPhone, updatePhone,async function (err){
      if (err) { console.log(err)
        res.send({ "code":400,"message":"error ocurred"})}
      else res.send({ "code":200,"message":"successful update"})
    })
  }      
  
  })

})



//a route of booking, handling booking request from BookingPage in react native app
app.post('/booking', function(req,res){
    res.status(200)
    //console.log(req.body)
    bookingTime = req.body.Time
    bookingDate = req.body.Date

    //Check whether the booking is available or not
    const sql = `SELECT * FROM booking 
                 WHERE date =? 
                 AND time =?`
          
    
    const booking = [bookingDate, bookingTime]
    const bookingInfo = [[currentUser, bookingDate, bookingTime]]


    db.query(sql, booking, async function (err, results, fields){
     if (err) { console.log(err)
       res.send({ "code":400,"message":"error ocurred"})}
     else{ if(results.length !=0){ 
              console.log("Booking is unavailable")
              res.send({"message":"Booking is unavailable"})} 
           else{

                 const sql2 =   "SELECT * FROM booking WHERE email = ?"   
                 db.query(sql2,[currentUser],async function (err,results, fields){
                  if (err) { console.log(err)
                    res.send({ "code":400,"message":"error ocurred"})}
                  else{ 
                         if(results.length !=0){
                            console.log("Booking is unavailable")
                            res.send({"message":"You have booked"})}
                         else{


                             const sql_booking = "INSERT INTO booking (email,date,time) VALUES ?"
                             db.query(sql_booking, [bookingInfo], function (err) {
                             if (err) throw err
                             console.log("Booking  is success")
                             res.send({"message":"Booking  is success"})})
                            }
   
                   }

                })
         
            }
          }

    })

    
})


//profile page
app.get('/home',  function(req,res){
    res.status(200)
    const sql = "SELECT date FROM booking WHERE email = ?" 
    const sql2 = "SELECT time FROM booking WHERE email = ?"
    
    db.query(sql,[currentUser],async function (err,results, fields){
      console.log(results)
      if (err) { console.log(err)
        res.send({ "code":400,"message":"error ocurred"})}
      else { if(results.length!=0){bookingDate=results[0].date}
             else bookingDate=''}})

    db.query(sql2,[currentUser],async function (err,results, fields){
      console.log(results)
      if (err) { console.log(err)
        res.send({ "code":400,"message":"error ocurred"})}
      else { if(results.length!=0){bookingTime=results[0].time}
             else bookingTime=''}})
    
    
    res.send({Time:bookingTime,Date:bookingDate,User:username,Email:currentUser})
   
})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
