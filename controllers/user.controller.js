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
        
    // console.log('Req', req.body);

    if(!req.body){
        res.status(400).json('Wrong request');
    }

    let userData = { 
        token: req.body.token, 
        deviceOS: req.body.deviceOS,
        createdDate: new Date().getTime().toString(),
        enabled: req.body.enabled,
        cityId: req.body.cityId
    }

    let newUser = new User(userData);

    // If user not exist on db, add him
    User.findOne({token: req.body.token}, (err, userSingle)=>{

        if(err){ console.error(`User: not found | ${err}`) }
        
        if(!userSingle){
            
            User.create(newUser, (err, result)=>{
                if(err) console.error(`User: not saved`);

                res.status(200).json("User: new");
            });
        }else{           
            console.log(`Update user`);
            
            console.log(`USER: ${newUser}`);

            User.updateOne({ "token": req.body.token}, userData, (err, raw)=>{
                if(err) { console.error(`User.update() | error: ${err}`) }     

                res.status(200).json(`User: updated`);
            });
        }

    });
                
}