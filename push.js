const moment = require('moment');
const admin = require("firebase-admin");
const namazEventsByTime = require('./data/orazaKZ');
const User = require('./models/user');
var serviceAccount = require("./serviceAccountKey.json");
let interval;

// DB
const express = require('express');
const mongoose = require('mongoose');
const constants = require('./config/constants');

// const app = express();
const port = 4000;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ramazan-d4b60.firebaseio.com"
});

const findUsersByCity = (cityId = 2) => {    
    return new Promise((resolve, reject) => {
        User.find({ cityId: cityId, enabled: true }, (err, users) => {
            if (err) { reject('User not found!') }            
            resolve(users);
        });
    });
}

const stopInterval = () => {
    clearInterval(interval);
}

const sendPush = (deviceToken, payload) => {

    var options = { priority: "high", timeToLive: 60 * 60 * 24 };

    admin.messaging().sendToDevice(deviceToken, payload, options)
        .then(function (response) {
            console.log("Successfully sent message");
        })
        .catch(function (error) {
            console.log("Error sending message:", error);
        });
}

const start = () => {
    console.log(`App start`);
    
    interval = setInterval(() => {
        
        // Stop Interval
        if (new Date() == new Date('2019-06-05 00:00')) { stopInterval() }

        const currentDate = moment().locale('uk').format('YYYY-MM-DD HH:mm');

        // Находим намаз и город по времени        
        let namazList = namazEventsByTime.filter(item => item.date == currentDate);
        if (!namazList) return;

        namazList.forEach(async namazSingle => {
            var payload = { notification: { title: namazSingle.title, body: namazSingle.body }};

            // По городу нужно найти всех пользователей
            const users = await findUsersByCity(namazSingle.city.id);
            if(!users){
                console.error(`No users`);  
                return;
            }
            
            // Отправляем пуши            
            users.forEach(user => sendPush(user.token, payload));            
        });
    }, 60*1000);
}

/**
 * App: Start
 */
mongoose.connect(constants.DB_CONNECTION, {useNewUrlParser: true}, (err) => {
    if (err) console.log(err);
    console.info(`DB is connected`);
    start();    
});