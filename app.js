const express = require('express');
const bodyParser = require('body-parser');
const responseGenerator = require('./api/responseGenerator');

const app = express();

app.use(bodyParser.json())

const userRoute = require('./api/routes/user/user');
const gamestatusRoute = require('./api/routes/gamestatus/gamestatus');
const questionRoute = require('./api/routes/question/question');
const storeRoute = require('./api/routes/store/store');
const payRoute = require('./api/routes/pay/pay');
const signInRoute = require('./api/routes/signIn/signIn');
const topScoresRoute = require('./api/routes/topScores/topScores');
const teamsMembersNumberRoute = require('./api/routes/teamMembersNumber/teamMembersNumber');
const addScoreRoute = require('./api/routes/addScore/addScore');


app.use('/user', userRoute);
app.use('/gamestatus', gamestatusRoute);
app.use('/question', questionRoute);
app.use('/store', storeRoute);
app.use('/pay', payRoute);
app.use('/signin', signInRoute);
app.use('/topscores', topScoresRoute);
app.use('/teamsmembersnumber', teamsMembersNumberRoute);
app.use('/addscore', addScoreRoute);


app.use((req, res, next) => {
    const responseJson = {
        message : "wrong route or method"
    };
    responseGenerator.sendJson(res, 404, responseJson);
});

module.exports = app;
