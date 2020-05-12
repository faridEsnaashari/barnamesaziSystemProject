const express = require('express');
const router = express.Router();


const handleGetRequest = require('./get');
const handlePutRequest = require('./put');

router.get('/', (req, res, next) => {
    handleGetRequest(req, res);
});

router.put('/', (req, res, next) => {
    handlePutRequest(req, res);
});


module.exports = router;
