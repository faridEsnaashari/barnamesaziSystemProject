const express = require('express');

const app = express();

const userRoute = require('./api/routes/user');
const gamestatusRoute = require('./api/routes/gamestatus');
const questionRoute = require('./api/routes/question');
const storeRoute = require('./api/routes/store');

app.use('/user', userRoute);
app.use('/gamestatus', gamestatusRoute);
app.use('/question', questionRoute);
app.use('/store', storeRoute);

module.exports = app;
