const mongoose = require('mongoose');
const fetch = require("node-fetch");
const PrayerTime = require('../libs/prayertimes/PrayTimes');
const getTimes = require('../data/cities');

/**
 * @returns namaz times by city
 */
// exports.getNamazByCity = async (req, res, next) => {
//     console.log(`Namaz | getNamazByCity`);
//     console.log(`Body ${JSON.stringify(req.query)}`);

//     if (req.query.year && req.query.longitude && req.query.latitude) {

//         const year = req.query.year;
//         const longitude = req.query.longitude;
//         const latitude = req.query.latitude;                
//         const url = `http://namaz.muftyat.kz/api/times/${year}/${longitude}/${latitude}`;

//         let orazaListYear = await fetch(url);
//         orazaListYear = await orazaListYear.json();
//         res.status(200).json(orazaListYear);

//     } else {
//         res.status(400).json(`Incorrect request`);
//     }
// }

const getTimeZoneByCity = (latitude, longitude)=>{
    let arr = getTimes();
    return arr.find(x => x.location[0] == latitude && x.location[1] == longitude).timeZone || null;
}

exports.getNamazByCity = async (req, res, next) => {
    console.log(`Namaz | getNamazByCity`);
    console.log(`Body ${JSON.stringify(req.query)}`);

    if (req.query.year && req.query.longitude && req.query.latitude) {

        const year = req.query.year || new Date().getFullYear();
        const longitude = req.query.longitude;
        const latitude = req.query.latitude;           

        // Config
        let prayTimes = new PrayerTime();
        console.log(`P: ${prayTimes}`);
        prayTimes.setMethod('ISNA');
        prayTimes.adjust( {asr: 'Hanafi', highLats: 'AngleBased'} );                
        
        // Correction
        if(latitude < 48){
            prayTimes.tune( {sunrise: -3, sunset: 3, dhuhr: 3, asr: 3, maghrib: 3} );
        }else{
            prayTimes.tune( {sunrise: -5, sunset: 5, dhuhr: 5, asr: 5, maghrib: 5} );
        }
        
        // Set TimeZone. store on cities data
        let timeZone = getTimeZoneByCity(latitude, longitude)                
        let result = [];
        let startDate = new Date(year, 0, 1);
        let endDate = new Date(year, 11, 31);

        for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
            
            var times = prayTimes.getTimes(d, [latitude, longitude], timeZone, 'auto','24h');
            result.push({
                Date: `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`,
                Fajr: times.fajr,  
                Sunrise: times.sunrise,
                Dhuhr: times.dhuhr,
                Asr: times.asr,
                Maghrib: times.maghrib,
                Isha: times.isha
            });
        }        
        
        res.status(200).json({result: result});

    } else {
        res.status(400).json(`Incorrect request`);
    }
}