const express = require('express');
const router = express.Router();
const responseGenerator = require('../../responseGenerator');
const NodeCache =require('node-cache');
const sqlConnection = require('../../sqlConnection');
const myCache = new NodeCache({stdTTL:420,checkperiod:420});

var kavenegar = require('kavenegar');
var api = kavenegar.KavenegarApi({
   apikey: '2B676B31796E72583349713767514E6173715077544B7676784B4F74526E4333526E2F2B322F4A474D39453D'  
});

router.get('/:number', (req, res, next) => {
console.log(req.params.number);
    const userPhoneNumber = req.params.number.toString();
    const code =Math.floor((Math.random()*900000)+100000)
    console.log(code);
    myCache.set(userPhoneNumber,code);
    api.Send({
        message:'کد تایید :'+code,
        sender:'10008445',
        receptor:userPhoneNumber
    },
    function(res , status){
        console.log(res);
        console.log(status);
    }
    );
    // handleVerifyPhoneNumberRequest(req, res);
    const responseJson = {
        message : "Code sent",
        Code: code
    };
    // res.send(true);
   return responseGenerator.sendJson(res, 200, responseJson);
});


router.post('/', (req, res, next) => {
   if(!req.body.code) return console.log("Code is null");
    const code = req.body.code;
    const cacheCode = myCache.get(req.body.phonenumber);
    console.log(code,cacheCode);
    if(code==cacheCode)
    {
        const query = "UPDATE user SET isVerifiedPhoneNumber = 1 WHERE phoneNumber ="+ req.body.phonenumber;
        sqlConnection.query(query,function (err, result, fields){
            if(err){
                responseJson = {
                    "message" : err
                }
                responseGenerator.sendJson(res, 409, responseJson);
                return;
            }
            if(result.affectedRows === 0){
                responseJson = {
                    "message" : "user not found"
                };
                responseGenerator.sendJson(res, 404, responseJson);
                return;
            }
        });

        const responseJson = {
            message : "Verified Successfull"
        };
    responseGenerator.sendJson(res, 200, responseJson);
    }
    else{
        const responseJson = {
            message : "Verified Failed"
        };
        responseGenerator.sendJson(res, 400, responseJson);
    }
});


module.exports = router;
