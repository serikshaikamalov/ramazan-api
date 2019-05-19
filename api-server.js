const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const constants = require('./config/constants');
const usersRoutes = require('./routes/user.route');
const ramazanRoutes = require('./routes/ramazan.route');

const app = express();
const port = 4000;


/**
 * Each request goes
 * 1. Middleware: Check user token
 * 2. Middleware: Check user permission
 * 3. Middleware: Return result
 */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/**
 * Middleware: Resource
 */
app.use('/users', usersRoutes);
app.use('/ramazan', ramazanRoutes);

/**
 * App: Start
 */
app.listen(port, (error) => {

    if (error) console.error(error);
    const connectionString = constants.DB_CONNECTION;

    mongoose.connect(connectionString, (err) => {
        if (err) {
            console.log(err);
        }
        console.log(`Example app listening on port ${port}!`);
    });
});
