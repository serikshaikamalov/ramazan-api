const mongoose = require('mongoose');
const fetch = require("node-fetch");

// Get Data Models
// const Namaz = require('../models/namaz');

/**
 * @returns namaz times by city
 */
exports.getNamazByCity = async (req, res, next) => {
    console.log(`Namaz | getNamazByCity`);
    console.log(`Body ${JSON.stringify(req.query)}`);

    if (req.query.year && req.query.longitude && req.query.latitude) {

        const year = req.query.year;
        const longitude = req.query.longitude;
        const latitude = req.query.latitude;

        const url = `http://namaz.muftyat.kz/api/times/${year}/${longitude}/${latitude}`;

        let orazaListYear = await fetch(url);
        orazaListYear = await orazaListYear.json();
        res.status(200).json(orazaListYear);

    } else {
        res.status(400).json(`Incorrect request`);
    }
}