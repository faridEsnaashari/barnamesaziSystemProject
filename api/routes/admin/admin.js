const express = require('express');
const router = express.Router();

const handleRoot = require('./root');
const handlePostLogin = require('./postLogin');
const handleGetLogin = require('./getLogin');
const handleLogout = require('./logout');

const handleDashboard = require('./dashboard/dashboard');
//user
const handleGetUser = require('./dashboard/user/userGet');
const handlePutUser = require('./dashboard/user/userPut');
const handleDeleteUser = require('./dashboard/user/userDelete');
//store
const handleGetStore = require('./dashboard/store/storeGet');
const handleDeleteStore = require('./dashboard/store/storeDelete');
const handlePutStore = require('./dashboard/store/storePut');
const handlePostStore = require('./dashboard/store/storePost');

router.get('/', (req, res, next) => {
    handleRoot(req, res);
});

router.get('/login', (req, res, next) => {
    handleGetLogin(req, res);
});

router.post('/login', (req, res, next) => {
    handlePostLogin(req, res);
});

router.get('/logout', (req, res, next) => {
    handleLogout(req, res);
});

router.get('/dashboard', (req, res, next) => {
    handleDashboard(req, res);
});

router.get('/dashboard/user', (req, res, next) => {
    handleGetUser(req, res);
});

router.put('/dashboard/user', (req, res, next) => {
    handlePutUser(req, res);
});

router.delete('/dashboard/user', (req, res, next) => {
    handleDeleteUser(req, res);
});

router.get('/dashboard/store', (req, res, next) => {
    handleGetStore(req, res);
});

router.delete('/dashboard/store', (req, res, next) => {
    handleDeleteStore(req, res);
});

router.put('/dashboard/store', (req, res, next) => {
    handlePutStore(req, res);
});

router.post('/dashboard/store', (req, res, next) => {
    handlePostStore(req, res);
});

module.exports = router;
