const moment  = require('moment');
const admin   = require("firebase-admin");
const namazEventsByTime = require('../data/orazaKZ');
let interval;

exports.sendPush = (req, res, next) => {

    debugger;
    interval = setInterval(() => {        

        // Stop Interval
        if (new Date() == new Date('2019-06-05 00:00')) { stopInterval() }

        const currentDate = moment().locale('uk').format('YYYY-MM-DD HH:mm');

        // Находим намаз и город по времени        
        let namazList = namazEventsByTime.filter(item => item.date == currentDate);
        if (!namazList) return;

        namazList.forEach(namazSingle => {
            var payload = {
                notification: {
                    title: namazSingle.title,
                    body: namazSingle.body
                }
            };

            // По городу нужно найти всех пользователей
            const users = findUsersByCity(namazSingle.city.id);

            // Отправляем пуши по конетам
            if (users) {
                users.forEach(user => {
                    sendPush(user.userToken, payload);
                });
            }
        });
        

    }, 6*1000);
}

const findUsersByCity = (cityId) => {

    let users = [
        {
            userToken: 'ebvgwxnXyxQ:APA91bGaxTtkz5bSMUXyUQlhpVfqjsJDlCS_CYsuJOkIqaKIR48e6M1CuMS4RqSwP2bKXz0a5dvCFt4yeGB_GzcWGkvM6b1tjgd0Ezw8DIb6o8waAOCc2vn5hM0Sx1uEI0Oj3OJr9Gqi',
            cityId: 2,
            deviceOS: 'android'
        }
    ];
    
    return users.filter(x => x.cityId == cityId);
}

const stopInterval = () => {
    clearInterval(interval);
}

const sendPush = (deviceToken, payload) => {

    var options = { priority: "high", timeToLive: 60 * 60 * 24 };

    admin.messaging().sendToDevice(deviceToken, payload, options)
        .then(function (response) {
            console.log("Successfully sent message:", response);
        })
        .catch(function (error) {
            console.log("Error sending message:", error);
        });
}