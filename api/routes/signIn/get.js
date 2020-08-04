const responseGenerator = require('../../responseGenerator');
const sqlConnection = require('../../sqlConnection');
const token = require('../../token');



function handleGetRequest(req, res){
    if(!checkParameters(req)) {
        const responseJson = {
            message : "bad parameter provided"
        };
        responseGenerator.sendJson(res, 400, responseJson);

        return;
    }
    const userPhoneNumber = req.query.phonenumber;

    const query = "SELECT * FROM user where phonenumber = '" + userPhoneNumber + "'";

    sqlConnection.query(query, function (err, result, fields) {
        if (err) throw err;

        if(result[0] == undefined)
        {
            const responseJson = {
              "message": "user not found"
            };
            responseGenerator.sendJson(res, 404, responseJson);
            return;
        }
        const userId = result[0].userId; 
        const userToken = {
            token : token.create(userId)
        };
        responseGenerator.sendJson(res, 200, userToken);
    });
}

function checkParameters(req) {
    if(req.query.phonenumber == undefined || req.query.phonenumber == null){
        return false;
    }
    return true;
}


module.exports = handleGetRequest;
