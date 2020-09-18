const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');
const nodemailer = require('nodemailer');

router.get('/feedback',(req,res) => {
    res.render('moviepage/feedback',{
        viewTitle : "Inserted"
    });
});

router.post('/',(req,res) => { 
    insertrecord(req,res);
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.feedback}</p>
  `;

  // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: 'gmail',
//     auth: {
//         user: 'rupkryz@gmail.com', // generated ethereal user
//         pass: 'rup081599'  // generated ethereal password
//     },
//     tls:{
//       rejectUnauthorized:false
//     }
//   });

//   // setup email data with unicode symbols
//   let mailOptions = {
//       from: '"Nodemailer Contact" rupkryz@gmail.com', // sender address
//       to: 'rupkryz@gmail.com', // list of receivers
//       subject: 'Node Contact Request', // Subject line
//       text: 'Hello world?', // plain text body
//       html: output // html body
//   };

//   // send mail with defined transport object
//   transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//           return console.log(error);
//       }
//       console.log('Message sent: %s', info.messageId);   
//       console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

//   });
});


function insertrecord(req,res){
    var user = new Movie();
    user.name = req.body.name;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.feedback = req.body.feedback;
    user.save((err, doc) => {
        if (!err)
            res.redirect('moviepage/thank');
        else {
            if(err.name == 'ValidationError'){
                handleValidationError(err,req.body);
                res.render('moviepage/feedback',{
                    viewTitle : "Inserted",
                    movie: req.body
                });
            }
            else
                console.log('Error during the insertion :' + err);
        }
    });

}

function handleValidationError(err,body){
    for(field in err.errors)
    {
        switch(err.errors[field].path){
            case 'name':
                body['nameError'] = err.errors[field].message;
                break;
            case 'lastname':
                body['lastnameError']=err.errors[field].message;
                break;
            case 'email':
                body['emailError']=err.errors[field].message;
                break;
            default:
                break;
        }
    }
}







router.get('/',(req,res)=>{
    res.render("moviepage/home",{
        // style: 'main.css',

    })
});

router.get('/movies',(req,res)=>{
    res.render("moviepage/movies",{
        // style: 'main.css',
        
    })
});

router.get('/tvshows',(req,res)=>{
    res.render("moviepage/tvshows",{
        // style: 'main.css',
        
    })
});

router.get('/moviedesc',(req,res)=>{
    res.render("moviepage/moviedesc",{
        // style: 'main.css',
        
    })
});

router.get('/login',(req,res)=>{
    res.render("moviepage/login",{
        // style: 'main.css',
        
    })
});

router.get('/thank',(req,res)=>{
    res.render("moviepage/thank",{
        // style: 'main.css',
        
    })
});

router.get('/list',(req,res) => {
    Movie.find((err,docs) => {  
        if (!err) {
            res.render('moviepage/list',{
                list: docs.map(docs => docs.toJSON())
            });
        }
        else {
            console.log("error in retrieving :" +err);
        }
    });
});

router.get('/delete/:id', (req,res) => {
    Movie.findByIdAndRemove(req.params.id, (err,doc) => {
        if (!err) {
            res.redirect('/moviepage/list');
        }
        else {
            console.log('error in delete'+err);
        }
    });
});




 
module.exports = router;