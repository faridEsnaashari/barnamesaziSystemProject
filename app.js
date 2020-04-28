const express = require('express');

const app = express();

app.use((req, res, next) => {
    next();
});

module.exports = app;
