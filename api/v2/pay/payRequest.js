const zarinpal = require(`${ global.path.tools.zarinpal }`);
const token = require(`${ global.path.tools.token }`);
const sqlConnection = require(`${ global.path.tools.mysqlConnection }`);

function handlePayRequest(req, res){
    if(!checkParameters(req)) {
        res.responseController.error(400, "bad parameter provided");
        return;
    }
    const itemId= req.query.itemid;
    const userToken = req.query.usertoken;

    let userId = null;
    try{
        userId = token.verify(userToken);
    }
    catch(err){
        res.responseController.error(401, "user unauthorized");
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
            url : zarinpallResponse.url
        };
        res.responseController.send(200, "zarinpal url", responseJson);
    }
    else{
        res.responseController.error(503, "zarinpall returns an error");
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

