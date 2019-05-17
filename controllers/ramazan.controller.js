const request = require('request');
const fetch = require("node-fetch");
const moment = require('moment-hijri');
const getCities = require('../data/cities');
/**
 * Формирует список событие(фажр и сухур) из намаза
 * 
 * [
    {
        dateTime: '2019-05-17 18:05',
        title: 'Аср',
        body: 'Аср намазы кірді',
        city: {
            id: 2,
            title: 'Алматы',
            location: [43.238293, 76.945465]
        }
    }
 * ]
 */


/**
 * Солнечный каленлар
 */
getRamazanStartDate = () => {
    let hijraYear = moment(new Date()).locale('uk').format('iYYYY');

    let ramazanMonth = {
        year: hijraYear,
        month: 8,
        day: 1
    }
    console.log('Ramazan Start Date: ', moment(`${ramazanMonth.year}/${ramazanMonth.month + 1}/${ramazanMonth.day}`, 'iYYYY/iM/iD').locale('uk').toDate());
    return moment(`${ramazanMonth.year}/${ramazanMonth.month + 1}/${ramazanMonth.day}`, 'iYYYY/iM/iD').locale('uk').toDate();
}

/**
 * Возвращает конец даты месяца рамазан в формате солнечного каленаря
 * @return '20-01-2019'
 */
getRamazanEndDate = () => {
    let hijraYear = moment(new Date()).locale('uk').format('iYYYY');
    let ramazanMonth = {
        year: hijraYear,
        month: 9,
        day: 2
    }

    console.log('Ramazan End: ', moment(`${ramazanMonth.year}/${ramazanMonth.month + 1}/${ramazanMonth.day}`, 'iYYYY/iM/iD').locale('uk').subtract(1, 'idate').toDate());
    return moment(`${ramazanMonth.year}/${ramazanMonth.month + 1}/${ramazanMonth.day}`, 'iYYYY/iM/iD').locale('uk').subtract(1, 'idate').toDate();
}

combineArrays = (namaz) => {
    return [...namaz[0], ...namaz[1], ...namaz[2], ...namaz[3], ...namaz[4], ...namaz[5], ...namaz[6], ...namaz[7], ...namaz[8], ...namaz[9], ...namaz[10], ...namaz[11]];
}

getRamazanMonthInGregorianCalendar = ($namaz, $startDate, $endDate) => {

    if (!$namaz) return;

    return $namaz.filter(x => {
        let dateArr = x.date.split('-');
        let date = new Date(dateArr[2], (dateArr[1] - 1), dateArr[0]);

        return (date >= $startDate && date <= $endDate);
    });
}


/**
* @return Namaz[]
*/
const start = () => {
    
    let ramazanAllKazakhstanForOneMonth = [];

    const ramazanStartDate = getRamazanStartDate();
    const ramazanEndDate = getRamazanEndDate();

    // Get: KZ Cities
    const cities = getCities();

    cities.forEach(async city => {

        // Get Namaz For 1 year
        const year = new Date().getFullYear();
        const url = `http://namaz.muftyat.kz/api/times/${year}/${city.location[0]}/${city.location[1]}`;

        let orazaListYear = await fetch(url);
        orazaListYear = await orazaListYear.json();

        debugger;

        if (!orazaListYear && orazaListYear.result) return;

        const $namaz = combineArrays(orazaListYear.result);
        const $ramazanDatesInSunFormat = getRamazanMonthInGregorianCalendar($namaz, ramazanStartDate, ramazanEndDate);


        if (!$ramazanDatesInSunFormat) return;

        $ramazanDatesInSunFormat.forEach(orazaSingle => {

            let dateArr = orazaSingle.date.split('-');

            let suhur = {
                title: 'Ауыз бекиту',
                body: 'Ауыз бекітіп алыңыз',
                date: `${dateArr[2]}-${dateArr[1]}-${dateArr[0]} ${orazaSingle.Fajr}`,
                city: city
            }


            let iftar = {
                title: 'Ауызашар',
                body: 'Алла қабыл еткей оразаңызды!',
                date: `${dateArr[2]}-${dateArr[1]}-${dateArr[0]} ${orazaSingle.Maghrib}`,
                city: city
            }

            ramazanAllKazakhstanForOneMonth.push(suhur, iftar);
        });        
    });


    return new Promise((resolve, reject) => {
        setTimeout(() => {        
            
            if(ramazanAllKazakhstanForOneMonth){

                ramazanAllKazakhstanForOneMonth.sort((a,b)=>{
                    return new Date(a.date) - new Date(b.date);
                })

                resolve(ramazanAllKazakhstanForOneMonth);
            }else{
                reject('Not found');
            }
        }, 5000);
    });    
}


exports.getRamazanKZ = async (req, res, next) => {
              
    let result = await start();    
    res.json(result);
}