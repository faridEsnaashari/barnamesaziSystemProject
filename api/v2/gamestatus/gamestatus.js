const express = require('express');
const router = express.Router();

const handleGetRequest = require('./get');
const handlePostRequest = require('./post');
const handlePutRequest = require('./put');

router.get('/', (req, res, next) => {
    handleGetRequest(req, res);
});

router.post('/', (req, res, next) => {
    handlePostRequest(req, res);
});

router.put('/', (req, res, next) => {
    handlePutRequest(req, res);
});


module.exports = router;
