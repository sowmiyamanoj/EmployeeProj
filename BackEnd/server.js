const express = require('express');
const app = express();
const cors = require("cors")
require('express-async-errors'),
bodyparser = require('body-parser');
const db = require('./config/db');
const employeeRoutes = require('./controllers/employeeController');
const rolesRoutes = require('./controllers/roleController');
const holidayRoutes = require('./controllers/holidayController');
const timeRoutes=require('./controllers/timeController');
const sendEmail = require('./contactUs');

app.use(cors())
app.use(express.json())
app.use('/api/employee', employeeRoutes);
app.use((err,req,res,next) => {
  console.log(err)
  res.status(err.status || 500).send('Something went wrong!')
})

//middleware
app.use(cors())
app.use(express.json())
app.use('/api/roles', rolesRoutes);
app.use((err,req,res,next) => {
  console.log(err)
  res.status(err.status || 500).send('Something went wrong!')
})

//middleware
app.use(cors())
app.use(express.json())
app.use('/api/holiday', holidayRoutes);
app.use((err,req,res,next) => {
  console.log(err)
  res.status(err.status || 500).send('Something went wrong!')
})

app.use(cors())
app.use(express.json())
app.use('/api/time',timeRoutes);
app.use((err,req,res,next) => {
  console.log(err)
  res.status(err.status || 500).send('Something went wrong!')
})


app.get("/email", (req, res) => {
  sendEmail(req.query)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

db.query("SELECT 1")
.then(() => {console.log('db connection succeeded')
app.listen(5000,
  () => console.log ('server started at 5000'))})
.catch(err => console.log('db connection failed. \n' + err))