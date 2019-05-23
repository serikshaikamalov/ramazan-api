const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const constants = require('./config/constants');
const usersRoutes = require('./routes/user.route');
const ramazanRoutes = require('./routes/ramazan.route');
const namazRoutes = require('./routes/namaz.route');
const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/users', usersRoutes);
app.use('/ramazan', ramazanRoutes);
app.use('/namaz', namazRoutes);

// App: Start 
app.listen(port, (error) => {
    console.info(`App start`);
    if (error) console.error(error);
    
    mongoose.connect(constants.DB_CONNECTION, (err) => {
        if (err) console.error(err);        
        console.log(`Example app listening on port ${port}!`);
    });
});