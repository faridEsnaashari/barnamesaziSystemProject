const responseGenerator = require('../../responseGenerator');
const sqlConnection = require('../../sqlConnection');
const token = require('../../token');

function handleGetRequest(req, res)
{
    if(!checkParameters(req))
    {
        const responseJson = {
            message : "bad parameter provided"
        };
        responseGenerator(res, 400, responseJson);

        return;
    }

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

    const query = "SELECT * FROM user where userId = '" + userId + "'";
 
//    let query = null;
//    if(req.query.phonenumber != undefined){
//        query = "SELECT * FROM user where phonenumber = '" + req.query.phonenumber + "'";
//    }
//    else{
//        query = "SELECT * FROM user where username = '" + req.query.username + "'";
//    }

    sqlConnection.query(query, function (err, result, fields) {
        if (err) throw err;

        if(result[0] == undefined)
        {
            const responseJson = {
              "message": "user not found"
            };
            responseGenerator(res, 404, responseJson);
            return;
        }
        const user = {
            user : {
                username : result[0].username,
                phonenumber : result[0].phonenumber,
                name : result[0].name,
                teamColor : result[0].teamColor,
                health : result[0].health,
                ticket : result[0].ticket,
                score : result[0].score
            }
        };
        responseGenerator(res, 200, user);
    });

}

function checkParameters(req)
{
//    if(req.query.phonenumber == undefined && req.query.username == undefined)
//    {
//        return false;
//    }
//    return true;
    if(req.query.usertoken == undefined)
    {
        return false;
    }
    return true;
}

module.exports = handleGetRequest;
