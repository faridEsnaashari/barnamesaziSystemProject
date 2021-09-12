const express = require('express');
const bodyParser = require('body-parser');
const responseGenerator = require('./api/responseGenerator');
const hbs = require("express-handlebars");
const session = require("express-session");

const app = express();



app.engine("hbs", hbs({
    extname : "hbs",
    defaultLayout : "layout",
    layoutsDir : __dirname + "/views/layouts"
}));
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
app.use('/views', express.static(__dirname + '/views'));



app.use(bodyParser.json())


app.use(session({
    secret : "secret for project1234",
    name : "sessionid",
    resave : false,
    saveUninitialized : false,
}));

const userRoute = require('./api/routes/user/user');
const gamestatusRoute = require('./api/routes/gamestatus/gamestatus');
const questionRoute = require('./api/routes/question/question');
const storeRoute = require('./api/routes/store/store');
const payRoute = require('./api/routes/pay/pay');
const signInRoute = require('./api/routes/signIn/signIn');
const topScoresRoute = require('./api/routes/topScores/topScores');
const teamsMembersNumberRoute = require('./api/routes/teamMembersNumber/teamMembersNumber');
const addScoreRoute = require('./api/routes/addScore/addScore');
const adminRoute = require('./api/routes/admin/admin');
const verifyRoute = require('./api/routes/signIn/verifyPhoneNumber');

app.use('/user', userRoute);
app.use('/gamestatus', gamestatusRoute);
app.use('/question', questionRoute);
app.use('/store', storeRoute);
app.use('/pay', payRoute);
app.use('/signin', signInRoute);
app.use('/topscores', topScoresRoute);
app.use('/teamsmembersnumber', teamsMembersNumberRoute);
app.use('/addscore', addScoreRoute);
app.use('/admin', adminRoute);
app.use('/verify',verifyRoute);

app.use((req, res, next) => {
    const responseJson = {
        message : "wrong route or method"
    };
    responseGenerator.sendJson(res, 404, responseJson);
});

module.exports = app;
