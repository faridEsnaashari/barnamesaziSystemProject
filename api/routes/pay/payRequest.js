const responseGenerator = require('../../responseGenerator');
const zarinpal = require('../../zarinpal');
const token = require('../../token');
const sqlConnection = require('../../sqlConnection');

function handlePayRequest(req, res){
    if(!checkParameters(req)) {
        const responseJson = {
            message : "bad parameter provided"
        };
        responseGenerator.sendJson(res, 400, responseJson);

        return;
    }
    const itemId= req.query.itemid;
    const userToken = req.query.usertoken;

    let userId = null;
    try{
        userId = token.verify(userToken);
    }
    catch(err){
        const responseJson = {
            message : "user unauthorized"
        };
        responseGenerator.sendJson(res, 401, responseJson);

        return;
    }

    const query = "select price from store where id=" + itemId; 

    sqlConnection.query(query, function (err, result, fields) {
        if(err){
            throw err;
        }
        zarinpal.pay(res, result[0].price, userId, sendZarinpallURL, itemId);
    });
    
};

function sendZarinpallURL(zarinpallResponse, res){
    if (zarinpallResponse.status == 100) {
        const responseJson = {
            message : zarinpallResponse.url
        };
        responseGenerator.sendJson(res, 200, responseJson);
    }
    else{
        const responseJson = {
            url : "zarinpall returns an error"
        };
        responseGenerator.sendJson(res, 401, responseJson);
        return;
    }
}

function checkParameters(req){
    if(req.query.usertoken == undefined || req.query.itemid == undefined)
    {
        return false;
    }
    return true;
}

module.exports = handlePayRequest;

