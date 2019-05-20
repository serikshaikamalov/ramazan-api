var mongoose = require('mongoose');

// Get Data Models
const User = require('../models/user');

exports.getUsers = (req, res, next) => {
                
    User.find({}, ( err, users )=>{        
        if (err){ res.status(400).json(err); }

        console.info(`Users: ${users.length}`);
         
        res.json(users)
    });    
}

exports.saveToken = (req, res, nex) =>{
    console.log(`User | saveToken`);
        
    console.log('Req', req.body);

    if(!res){
        res.status(400).json('Wrong response');
    }

    let newUser = new User({ 
        token: req.body.token, 
        deviceOS: req.body.deviceOS,
        createdDate: req.body.createdDate,
        enabled: req.body.enabled,
        cityId: req.body.cityId
    });

    // If user not exist on db, add him
    User.find({token: newUser.token}, (err, user)=>{

        if(err){ console.error(`User.find() | ${err}`) }

        if(!user){ 
            User.create(newUser, (err, result)=>{
                if(err) console.error(`User not saved`);
                res.status(200).json("Added new users");
            });
        }else{
            User.update({token: token}, newUser, (err, raw)=>{
                if(err) { console.error(`User.update() | error: ${err}`) }                                
            });
        }

    });
                
}