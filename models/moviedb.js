const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This Field is Required'
    },
    lastname: {
        type: String,
        required: 'This Field is Required'
    },
    email: {
        type: String
    },
    feedback: {
        type: String
    }
});

userSchema.path('email').validate((val)=>{

    emailRegex= /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    return emailRegex.test(val);
    
    }, 'Invalid Email.');




mongoose.model('Movie',userSchema);