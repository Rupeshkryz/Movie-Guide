require('./models/db');

const express =require('express');
const path = require('path');
const exhbs = require('express-handlebars');
const bodyparser = require('body-parser');

const Moviecontroller = require('./Controller/Moviecontroller');

var app = express();

app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.json());

app.use(express.static('.'));

app.set('views',path.join(__dirname,'/views/'));
app.engine('hbs',exhbs({extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layout'}));
app.set('view engine', 'hbs');

app.listen(3001, () =>{
    console.log('Express server started at port : 3001');
});

app.use('/moviepage',Moviecontroller);



// var nodemailer = require('nodemailer');

// var transporter = 
//   nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     
//   user: 'rupkryz@gmail.com',
//     
//   pass: 'rup081599'
//   }
// });

// var mailOptions = {
//   
//   from: 'rupkryz@gmail.com',
//   
//   to: 'prupesh1999@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 
//   'That was easy!'
// };

// transporter.sendMail(mailOptions, 
//   function(error, info){
//   if (error) {
//     console.log(error);
//   } else {

//      
//   console.log('Email sent: ' + info.response);
//   }
// }); 

