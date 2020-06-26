const responseGenerator = require('../../responseGenerator');
const zarinpal = require('../../zarinpal');
const token = require('../../token');

function handlePayRequest(req, res){
    if(!checkParameters(req)) {
        const responseJson = {
            message : "bad parameter provided"
        };
        responseGenerator(res, 400, responseJson);

        return;
    }
    const amount = req.query.amount;

    const userToken = req.query.usertoken;

    let userId = null;
    try{
        userId = token.verify(userToken);
    }
    catch(err){
        const responseJson = {
            message : "user unauthorized"
        };
        responseGenerator(res, 401, responseJson);

        return;
    }
    
    zarinpal.pay(res, amount, userId);
};

function checkParameters(req){
    if(req.query.amount == undefined && req.query.usertoken == undefined)
    {
        return false;
    }
    return true;
}

module.exports = handlePayRequest;

