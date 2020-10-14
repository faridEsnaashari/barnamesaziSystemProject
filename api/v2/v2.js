const express = require('express');
const router = express.Router();

const userRoute = require('./user/user');
const gamestatusRoute = require('./gamestatus/gamestatus');
const questionRoute = require('./question/question');
const storeRoute = require('./store/store');
const payRoute = require('./pay/pay');
const signInRoute = require('./signIn/signIn');
const topScoresRoute = require('./topScores/topScores');
const teamsMembersNumberRoute = require('./teamMembersNumber/teamMembersNumber');
const addScoreRoute = require('./addScore/addScore');
const adminRoute = require('./admin/admin');


router.use('/user', userRoute);
router.use('/gamestatus', gamestatusRoute);
router.use('/question', questionRoute);
router.use('/store', storeRoute);
router.use('/pay', payRoute);
router.use('/signin', signInRoute);
router.use('/topscores', topScoresRoute);
router.use('/teamsmembersnumber', teamsMembersNumberRoute);
router.use('/addscore', addScoreRoute);
router.use('/admin', adminRoute);

module.exports = router;
