const fetch = require("node-fetch");
const getCities = require('../data/cities');

let cities = [
    {
        id: 5,
        title: 'Нұр-Сұлтан',
        location: [51.128207, 71.430411]
    },
    {
        id: 2,
        title: 'Алматы',
        location: [43.238293, 76.945465]
    },
    {
        id: 63,
        title: 'Шымкент',
        location: [42.3, 69.6]
    },
    {
        id: 12,
        title: 'Үшарал',
        location: [46.169722, 80.939444]
    },
    {
        id: 11,
        title: 'Талдықорған',
        location: [45.016667, 78.366667]
    },
    {
        id: 10,
        title: 'Сарыөзек',
        location: [44.356667, 77.969167]
    }, {
        id: 9,
        title: 'Қапшағай',
        location: [43.883333, 77.083333]
    }, {
        id: 15,
        title: 'Степногорск',
        location: [52.346944, 71.881667]
    }, {
        id: 14,
        title: 'Көкшетау',
        location: [53.291667, 69.391667]
    }, {
        id: 13,
        title: 'Атбасар',
        location: [51.816667, 68.35]
    }, {
        id: 19,
        title: 'Шалқар',
        location: [47.833333, 59.616667]
    }, {
        id: 18,
        title: 'Хромтау',
        location: [50.250278, 58.434722]
    }, {
        id: 17,
        title: 'Қандыағаш',
        location: [49.474444, 57.423333]
    }, {
        id: 16,
        title: 'Ақтөбе',
        location: [50.3, 57.166667]
    }, {
        id: 23,
        title: 'Миялы',
        location: [48.882933, 53.795988]
    }, {
        id: 22,
        title: 'Мақат',
        location: [47.65, 53.316667]
    }, {
        id: 21,
        title: 'Құлсары',
        location: [46.983333, 54.016667]
    }, {
        id: 20,
        title: 'Атырау',
        location: [47.116667, 51.883333]
    }, {
        id: 28,
        title: 'Семей',
        location: [50.411111, 80.2275]
    }, {
        id: 27,
        title: 'Риддер',
        location: [50.35, 83.516667]
    }, {
        id: 26,
        title: 'Өскемен',
        location: [49.95, 82.616667]
    }, {
        id: 25,
        title: 'Аягөз',
        location: [47.966667, 80.433333]
    }, {
        id: 32,
        title: 'Тараз',
        location: [42.883333, 71.366667]
    }, {
        id: 31,
        title: 'Қаратау',
        location: [43.166667, 70.466667]
    }, {
        id: 30,
        title: 'Жаңатас',
        location: [43.566667, 69.75]
    }, {
        id: 38,
        title: 'Сәтбаев',
        location: [47.900388, 67.537697]
    }, {
        id: 37,
        title: 'Қарағанды',
        location: [49.807754, 73.088504]
    }, {
        id: 36,
        title: 'Жезқазған',
        location: [47.800225, 67.713605]
    }, {
        id: 35,
        title: 'Жәйрем',
        location: [48.3375, 70.169167]
    }, {
        id: 34,
        title: 'Балқаш',
        location: [46.839326, 74.983356]
    }, {
        id: 111,
        title: 'Лисаков',
        location: [52.544079, 62.492641]
    }, {
        id: 110,
        title: 'Денис ауданы',
        location: [52.439315, 61.744587]
    }, {
        id: 109,
        title: 'Ұзынкөл ауданы',
        location: [54.045149, 65.343400]
    }, {
        id: 108,
        title: 'Жітіқара ауданы',
        location: [52.183911, 61.189797]
    }, {
        id: 107,
        title: 'Алтынсарин ауданы',
        location: [53.104086, 64.589965]
    }, {
        id: 106,
        title: 'Қамысты ауданы',
        location: [51.549566, 62.301561]
    }, {
        id: 105,
        title: 'Қарабалық ауданы',
        location: [53.752352, 62.054838]
    }, {
        id: 104,
        title: 'Әулиекөл ауданы',
        location: [52.363819, 64.135283]
    }, {
        id: 103,
        title: 'Таран ауданы',
        location: [52.536942, 62.774739]
    }, {
        id: 102,
        title: 'Сарыкөл ауданы',
        location: [53.316822, 65.536295]
    }, {
        id: 101,
        title: 'Науырзым  ауданы ',
        location: [51.304292, 63.628399]
    }, {
        id: 100,
        title: 'Меңдіқара ауданы',
        location: [53.933550, 64.299378]
    }, {
        id: 99,
        title: 'Қарасу ауданы',
        location: [52.341344, 65.392026]
    }, {
        id: 98,
        title: 'Жангелді ауданы',
        location: [49.699308, 63.631067]
    }, {
        id: 97,
        title: 'Федеров ауданы',
        location: [53.692845, 62.851689]
    }, {
        id: 96,
        title: 'Амангелді ауданы',
        location: [50.181660307383645, 65.1839681163495]
    }, {
        id: 42,
        title: 'Рудный',
        location: [52.966667, 63.116667]
    }, {
        id: 41,
        title: 'Қостанай',
        location: [53.219333, 63.634194]
    }, {
        id: 40,
        title: 'Арқалық',
        location: [50.248611, 66.911389]
    }, {
        id: 47,
        title: 'Қызылорда',
        location: [44.85, 65.516667]
    }, {
        id: 46,
        title: 'Қазалы',
        location: [45.766667, 62.116667]
    }, {
        id: 45,
        title: 'Байқоныр',
        location: [45.622546, 63.317654]
    }, {
        id: 44,
        title: 'Арал',
        location: [46.8, 61.666667]
    }, {
        id: 52,
        title: 'Жаңаөзен',
        location: [43.343266, 52.865792]
    }, {
        id: 51,
        title: 'Форт-Шевченко',
        location: [44.507463, 50.262833]
    }, {
        id: 50,
        title: 'Бейнеу',
        location: [45.322946, 55.188862]
    }, {
        id: 49,
        title: 'Ақтау',
        location: [43.635379, 51.169135]
    }, {
        id: 57,
        title: 'Петропавл',
        location: [54.862222, 69.140833]
    }, {
        id: 59,
        title: 'Павлодар',
        location: [52.285577, 76.940947]
    }, {
        id: 58,
        title: 'Екібастұз',
        location: [51.729778, 75.326583]
    }, {
        id: 122,
        title: 'Сайрам ауданы',
        location: [42.403930, 69.875266]
    }, {
        id: 121,
        title: 'Ордабасы ауданы',
        location: [42.473743, 69.195061]
    }, {
        id: 120,
        title: 'Мақтаарал ауданы',
        location: [40.724640, 68.497538]
    }, {
        id: 119,
        title: 'Келес ауданы',
        location: [41.305597, 68.544861]
    }, {
        id: 118,
        title: 'Түлкібас ауданы',
        location: [42.533791, 70.254561]
    }, {
        id: 117,
        title: 'Созақ ауданы',
        location: [44.861720, 68.569600]
    }, {
        id: 116,
        title: 'Қазығұрт ауданы',
        location: [41.862652, 69.579316]
    }, {
        id: 115,
        title: 'Бәйдібек ауданы',
        location: [43.027233, 69.485514]
    }, {
        id: 114,
        title: 'Отырар ауданы',
        location: [42.666225, 67.497308]
    }, {
        id: 64,
        title: 'Түркістан',
        location: [43.3, 68.243611]
    }, {
        id: 62,
        title: 'Шардара',
        location: [41.254722, 67.969167]
    }, {
        id: 61,
        title: 'Сарыағаш',
        location: [41.466667, 69.166667]
    }, {
        id: 60,
        title: 'Жетісай',
        location: [40.775278, 68.327222]
    }, {
        id: 70,
        title: 'Сайқын',
        location: [48.815278, 46.766944]
    }, {
        id: 69,
        title: 'Орал',
        location: [51.233333, 51.366667]
    }, {
        id: 68,
        title: 'Жәнібек',
        location: [49.416667, 46.85]
    }, {
        id: 67,
        title: 'Жаңқала',
        location: [49.215139, 50.303028]
    }, {
        id: 66,
        title: 'Чапаев',
        location: [50.182778, 51.175278]
    }, {
        id: 65,
        title: 'Ақсай',
        location: [51.10, 52.59]
    }
];

/**
 * Generator timezone for city based on lat and long
 */
const setTimeZones = ()=>{
    cities.map( async (city) => {
        let timeZone =  await getCityTimeZone(city);
        
        console.log(timeZone.dstOffset);
        city.timeZone = timeZone.dstOffset;
        return city;
    });
    setTimeout(() => {
        console.log(cities);
    }, 3000);    
}


const getCityTimeZone = async (city) => {

    const latitude = city.location[0];
    const longitude = city.location[1];
    
    const url = `http://secure.geonames.org/timezoneJSON?lat=${latitude}&lng=${longitude}&username=kenebayev2`;

    let timeZone = await fetch(url);
    timeZone = await timeZone.json();

    return timeZone;
}

setTimeZones();