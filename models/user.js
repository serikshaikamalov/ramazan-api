// External Dependancies
var mongoose = require('mongoose');

const userSchema = mongoose.Schema({ 
    token: String, 
    deviceOS: String,
    createdDate: String,
    enabled: String,
    city: {
        Id: Number,
        Title: String
    }
});

module.exports =  mongoose.model('User', userSchema);