"use strict";
const express = require('express');
const app = express();
const path = require('path');
const nodemailer = require('nodemailer');
const compression = require('compression')
const bodyParser = require('body-parser');

app.use(compression());
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.post('/contact', function(req, res) {

  let mailOpts, smtpTrans;
  //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
  smtpTrans = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: "pauric.holleran2@gmail.com",
      pass: process.env.EMAIL_PASSWORD
    }
  });
  //Mail options
  mailOpts = {
    // from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
    from: 'pauric.holleran2@gmail.com',
    to: 'pauric.holleran2@gmail.com',
    subject: req.body.subject,
    text: req.body.name + `\n` + req.body.email + `\n` + req.body.message
  };

  smtpTrans.sendMail(mailOpts, function(error, response) {
    
    //Email not sent
    if (error) {
      console.log(error);
      console.log("mail details:");
      console.log(mailOpts);
    }
    
    res.end();
  });

});


app.listen(process.env.PORT, process.env.IP, function() {
  console.log("App listening on port " + process.env.PORT);
});