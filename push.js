const moment = require('moment');
const fs     = require('fs');
const namazEventsByTime = require('./data/orazaKZ');
let interval;

// DB
const User = require('./models/user');
const mongoose = require('mongoose');
const constants = require('./config/constants');

// Firebase
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({ credential: admin.credential.cert(serviceAccount), databaseURL: "https://ramazan-d4b60.firebaseio.com" });

const findUsersByCity = (cityId = 2) => {    
    return new Promise((resolve, reject) => {
        User.find({ cityId: cityId, enabled: 'true' }, (err, users) => {
            if (err) { reject('User not found!') }            
            resolve(users);
        });
    });
}

const stopInterval = () => { clearInterval(interval); }

const sendPush = (deviceToken, payload) => {
    var options = { priority: "high", timeToLive: 60 * 60 * 24 };

    admin.messaging().sendToDevice(deviceToken, payload, options)
        .then( response => { log(`Successfully sent message`); })
        .catch( error => { log(`Error sending message: ${error}`); });
}

const log = data => {
    console.info(data); 
    fs.appendFile('logs.txt', `${data} - ${moment().locale('uk').format('YYYY-MM-DD HH:mm:ss')} \n`, (err)=>{});
}

const start = () => {    
    log(`App start`);

    process.env.TZ = 'Asia/Almaty';
    
    interval = setInterval(() => {
        
        // Stop Interval
        if (new Date() == new Date('2019-06-05 00:00')) stopInterval();

        const currentDate = moment().locale('uk').format('YYYY-MM-DD HH:mm'); log(`Date: ${currentDate}`);

        // Находим намаз и город по времени        
        let events = namazEventsByTime.filter(item => item.date == currentDate);
        
        if (events.length == 0){ log(`Suhur and iftar not found for that periud`);  return; }

        events.forEach(async eventSingle => {

            log(`City: ${eventSingle.city.title}`);
            log(`${eventSingle.title}: ${eventSingle.date}`);

            var payload = { notification: { title: eventSingle.title, body: eventSingle.body }};

            // По городу нужно найти всех пользователей
            const users = await findUsersByCity(eventSingle.city.id);
            if(!users){ log(`No users`);  return; }
            
            log(`User count: ${users.length}`);

            // Отправляем пуши            
            users.forEach(user => sendPush(user.token, payload));            
        });
    }, 60*1000);
}

/**
 * App: Start
 */
mongoose.connect(constants.DB_CONNECTION, {useNewUrlParser: true}, (err) => {
    if (err) log(`DB ${err}`);    
    log(`DB is connected`);
    start();    
});