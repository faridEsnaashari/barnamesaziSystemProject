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
    const userId = token.verify(req.query.usertoken);
    
    zarinpal.pay(res, amount, userId["userId"]);
};

function checkParameters(req){
    if(req.query.amount == undefined && req.query.usertoken == undefined)
    {
        return false;
    }
    return true;
}

module.exports = handlePayRequest;

