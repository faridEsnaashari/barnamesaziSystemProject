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
//question
const handleGetQuestion = require('./dashboard/question/questionGet');
const handlePutQuestion = require('./dashboard/question/questionPut');
const handleDeleteQuestion = require('./dashboard/question/questionDelete');
const handlePostQuestion = require('./dashboard/question/questionPost');
//gamestatus
const handleGetGamestatus = require('./dashboard/gamestatus/gamestatusGet');
const handlePostGamestatus = require('./dashboard/gamestatus/gamestatusPost');
const handlePutGamestatus = require('./dashboard/gamestatus/gamestatusPut');
const handleDeleteGamestatus = require('./dashboard/gamestatus/gamestatusDelete');

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

router.get('/dashboard/question', (req, res, next) => {
    handleGetQuestion(req, res);
});

router.put('/dashboard/question', (req, res, next) => {
    handlePutQuestion(req, res);
});

router.delete('/dashboard/question', (req, res, next) => {
    handleDeleteQuestion(req, res);
});

router.post('/dashboard/question', (req, res, next) => {
    handlePostQuestion(req, res);
});

router.get('/dashboard/gamestatus', (req, res, next) => {
    handleGetGamestatus(req, res);
});

router.post('/dashboard/gamestatus', (req, res, next) => {
    handlePostGamestatus(req, res);
});

router.put('/dashboard/gamestatus', (req, res, next) => {
    handlePutGamestatus(req, res);
});

router.delete('/dashboard/gamestatus', (req, res, next) => {
    handleDeleteGamestatus(req, res);
});

module.exports = router;
