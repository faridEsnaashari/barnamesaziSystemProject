const responseGenerator = require('../../responseGenerator');
const sqlConnection = require('../../sqlConnection');

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

    let query = null;
    if(req.query.phonenumber != undefined){
        query = "SELECT * FROM user where phonenumber = '" + req.query.phonenumber + "'";
    }
    else{
        query = "SELECT * FROM user where username = '" + req.query.username + "'";
    }

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
            username : result[0].username,
            phonenumber : result[0].phonenumber,
            name : result[0].name,
            teamColor : result[0].teamColor,
            health : result[0].health,
            ticket : result[0].ticket,
            score : result[0].score
        }
        responseGenerator(res, 200, user);
    });

}

function checkParameters(req)
{
    if(req.query.phonenumber == undefined && req.query.username == undefined)
    {
        return false;
    }
    return true;
}
module.exports = handleGetRequest;
