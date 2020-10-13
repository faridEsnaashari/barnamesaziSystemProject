const express = require('express');
const router = express.Router();


const handleGetRequest = require('./get');

router.get('/', (req, res, next) => {
    handleGetRequest(req, res);
});


module.exports = router;
