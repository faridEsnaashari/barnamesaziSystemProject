const config = require('./config');
global.env = config.env;
global.path = config.path;

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

const v1 = require('./api/v1/v1');

app.use('/', v1);
app.use('/v1', v1);


app.use((req, res, next) => {
    const responseJson = {
        message : "wrong route or method"
    };
    responseGenerator.sendJson(res, 404, responseJson);
});

module.exports = app;
