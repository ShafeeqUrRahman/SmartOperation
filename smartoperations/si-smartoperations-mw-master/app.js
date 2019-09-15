const express = require('express');
const app = express();
const smartoperation = require('morgan');
const departmentRoutes  = require('./api/routes/department-routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose
  .connect(
    "mongodb://localhost:27017/smartoperations"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

//morgan for development purpose 
app.use(smartoperation('dev'));

//bodyparser
app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

//CORS- Which allows the access betweeen different server in a browser
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });



//Routes will be defined
app.use('/department', departmentRoutes);

// if we are not finding any routes
app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status= 404; 
    next(error);
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;