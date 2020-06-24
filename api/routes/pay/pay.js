const express = require('express');
const router = express.Router();


const handlePayRequest = require('./payRequest');
const handlePaymentVerificationRequest = require('./paymentVerification');

router.get('/', (req, res, next) => {
    handlePayRequest(req, res);
});

router.get('/verify', (req, res, next) => {
    handlePaymentVerificationRequest(req, res);
});


module.exports = router;
