const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())

const userRoute = require('./api/routes/user/user');
const gamestatusRoute = require('./api/routes/gamestatus/gamestatus');
const questionRoute = require('./api/routes/question/question');
const storeRoute = require('./api/routes/store/store');
const payRoute = require('./api/routes/pay/pay');


app.use('/user', userRoute);
app.use('/gamestatus', gamestatusRoute);
app.use('/question', questionRoute);
app.use('/store', storeRoute);
app.use('/pay', payRoute);

module.exports = app;
