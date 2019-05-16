// Get Data Models
const User = require('../models/user');

exports.getUsers = (req, res, next) => {
                
    User.find({}, ( err, users )=>{        
        if (err){ res.status(400).json(err); }

        console.info(`Users: ${users.length}`);
         
        res.json(users)
    });    
}