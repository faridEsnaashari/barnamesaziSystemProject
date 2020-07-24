const express = require('express');
const router = express.Router();

const handleRoot = require('./root');
const handlePostLogin = require('./postLogin');
const handleGetLogin = require('./getLogin');
const handleDashboard = require('./dashboard/dashboard');
const handleLogout = require('./logout');

router.get('/', (req, res, next) => {
    handleRoot(req, res);
});

router.get('/login', (req, res, next) => {
    handleGetLogin(req, res);
});

router.post('/login', (req, res, next) => {
    handlePostLogin(req, res);
});

router.get('/dashboard', (req, res, next) => {
    handleDashboard(req, res);
});

router.get('/logout', (req, res, next) => {
    handleLogout(req, res);
});

module.exports = router;
