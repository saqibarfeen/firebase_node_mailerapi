
const dbRef  =require('./config/fbconfig');
var tools= require('./myfunctions');
//imports
const cron = require("node-cron");
const express = require("express");
let nodemailer = require("nodemailer");
const app = express();
const bodyParser     = require('body-parser');
app.use(bodyParser.json());
//glue the routes and the express app
require('./routes')(app, {});

// create mail transporter
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "trace9.cloud@gmail.com",
    pass: "cloud9net"
  }
});
//var myrequests=[];
// sending emails at periodic intervals
tools.scheduleCronForPerioidicEmailToAdmin(transporter,cron,dbRef);

//app.use( bodyParser.json() ); 

const port=8080;
app.listen(port, () => {
  console.log('We are live on ' + port);
});


module.exports.tools= tools;
module.exports.transporter= transporter;