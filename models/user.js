// External Dependancies
var mongoose = require('mongoose');

const userSchema = mongoose.Schema({ 
    token: String, 
    deviceOS: String,
    createdDate: String,
    enabled: String,
    cityId: Number
});

module.exports =  mongoose.model('User', userSchema);