const express = require('express')
const mysql = require('mysql')
const bodyParser = require("body-parser")
const app = express()
const port = 3001

require('dotenv').config()

// parse requests of content-type: application/json
app.use(bodyParser.json())

// parse requests 
app.use(bodyParser.urlencoded({ extended: true }))

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





// Create and Save a new record
const create = (req, res) => {
  if (!req.body) {
      res.status(400).send({
        message: "It is empty!"
      })
    }
  
    // Create new record
    const record = new Record({
      name: req.body.name,
      clinic: req.body.clinic,
      doctor: req.body.doctor,
      diagnosis: req.body.diagnosis,
      fee:  req.body.fee,
      date: req.body.date,
      time: req.body.time
    })
  
    // Save new record in the mysql database
    Record.create(record, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while add the new record!"
        });
      else res.send(data)
    })
}


// Retrieve all records from the mysql database
const findAll = (req, res) => {
  Record.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving records!"
        })
      else res.send(data)
    })

}


// Find a single consultation record with a patient Id
const findOne = (req, res) => {
  Record.findById(req.params.patientId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Record with id ${req.params.patientId}.`
          })
        } else {
          res.status(500).send({
            message: "Error retrieving record with id " + req.params.patientId
          })
        }
      } else res.send(data)
    })

}


// Update a record identified by the patient Id in the request
const update = (req, res) => {
// Validate Request
if (!req.body) {
  res.status(400).send({
    message: "Content can not be empty!"
  })
}

Record.updateById(
  req.params.patientId,
  new Record(req.body),
  (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found record with id ${req.params.patientId}.`
        })
      } else {
        res.status(500).send({
          message: "Error updating record with id " + req.params.patientId
        })
      }
    } else res.send(data)
  }
)

}


// Delete a record 
const deletedata = (req, res) => {
  Record.remove(req.params.patientId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found record with id ${req.params.patientId}.`
          })
        } else {
          res.status(500).send({
            message: "Could not delete record with id " + req.params.patientId
          })
        }
      } else res.send({ message: `The record was deleted ` })
    })

}


// Delete all records 
const deleteAll = (req, res) => {
  Record.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || " Error occurred when removing records."
        });
      else res.send({ message: `All records were deleted!` })
    })

}


// constructor 
const Record = function(record) {
  this.name = record.name
  this.clinic = record.clinic
  this.doctor = record.doctor
  this.diagnosis = record.diagnosis
  this.fee = record.fee
  this.date = record.date
  this.time = record.time
}


Record.create = (newRecord, result) => {
  db.query("INSERT INTO record SET ?", newRecord, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    console.log("Record created: ", { id: res.insertId, ...newRecord })
    result(null, { id: res.insertId, ...newRecord })
  })
}



Record.findById = (patientId, result) => {
  db.query(`SELECT * FROM record WHERE id = ${patientId}`, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    if (res.length) {
      console.log("found: ", res[0]);
      result(null, res[0])
      return;
    }
    result({ kind: "not_found" }, null)
  })
}



Record.getAll = result => {
  db.query("SELECT * FROM record", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return;
    }

    console.log("record: ", res)
    result(null, res)
  })
}



Record.updateById = (id, record, result) => {
  db.query(
    "UPDATE record SET name = ?, clinic = ?, doctor = ?, diagnosis = ?, fee = ?, date = ?, time = ? WHERE id = ?",
    [record.name, record.clinic, record.doctor, record.diagnosis, 
     record.fee, record.date, record.time,  id],
    (err, res) => {
      if (err) {
        console.log("error: ", err)
        result(null, err)
        return
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null)
        return
      }

      console.log("updated record: ", { id: id, ...record })
      result(null, { id: id, ...record })
    }
  )
}


Record.remove = (id, result) => {
  db.query("DELETE FROM record WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null)
      return
    }

    console.log("deleted record with id: ", id)
    result(null, res)
  })
}



Record.removeAll = result => {
  db.query("DELETE FROM record", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    console.log(`deleted ${res.affectedRows} record`);
    result(null, res);
  })
}






// basic route when api request for getting localhost:3001
app.get("/", (req, res) => {
  res.json({ message: "Welcome, this application for  the clinic" });
})


// Create a record
app.post("/record", create)

// Retrieve all record
app.get("/record", findAll)

// Retrieve a record with patient Id
app.get("/record/:patientId", findOne)

// Update one of the record with patient Id
app.put("/record/:patientId", update)

// Delete a record 
app.delete("/record/:patientId", deletedata)

// Delete all
app.delete("/record", deleteAll)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


module.exports = db