const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/MoviestackDB',{useNewUrlParser: true, useUnifiedTopology: true},(err)=>{
    if (!err) {console.log('MongoDB Connection success')}
    else {console.log('Error in connection'+err)}
});
require('./moviedb');