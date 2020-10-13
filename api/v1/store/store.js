const express = require('express');
const router = express.Router();


const handleGetRequest = require('./get');
const handlePutRequest = require('./put');
const handlePostRequest = require('./post');

router.get('/', (req, res, next) => {
    handleGetRequest(req, res);
});

router.put('/', (req, res, next) => {
    handlePutRequest(req, res);
});

router.post('/', (req, res, next) => {
    handlePostRequest(req, res);
});


module.exports = router;
