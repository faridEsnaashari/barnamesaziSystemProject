const express = require('express');
const router = express.Router();

 
const handleGetRequest = require('./get');
const handlePostRequest = require('./post');

router.get('/', (req, res, next) => {
    handleGetRequest(req, res);
});

router.post('/', (req, res, next) => {
    handlePostRequest(req, res);
});

module.exports = router;
