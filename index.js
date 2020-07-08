const express = require('express');
const app = express();

const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/sendemail', (req, res, next) => {
    console.log(req.body);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'canan.enginn5@gmail.com',
            pass: '129581185cnnengn!'
        }
    });
    var mailOptions = {
        from: req.body.email,
        to: 'canan.enginn5@gmail.com',
        subject: `Contact name: ${req.body.name}`,
        html: `<h1>Contact details</h1>
        <h2> name:${req.body.name} </h2><br>
        <h2> email:${req.body.email} </h2><br>
        <h2> message:${req.body.message} </h2><br>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email Sent: ' + info.response);
            res.send('Sent Successfully')
        }
    });
});      
app.listen(8080);
console.log("listen 8080")

