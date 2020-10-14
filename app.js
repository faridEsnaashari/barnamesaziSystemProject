const config = require('./config');
global.env = config.env;
global.path = config.path;

const express = require('express');
const bodyParser = require('body-parser');
const hbs = require("express-handlebars");
const session = require("express-session");
const responseController = require(global.path.middleware.responser);

const app = express();

app.use(responseController());

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
const v2 = require('./api/v2/v2');

app.use('/', v1);
app.use('/v1', v1);
app.use('/v2', v2);


app.use((req, res, next) => {
    res.responseController.error(404, "wrong route or method");
});

module.exports = app;
