const responseGenerator = require('../../responseGenerator');
const sqlConnection = require('../../sqlConnection');

function handlePostRequest(req, res)
{
    if(!checkParameters(req))
    {
        const responseJson = {
            message : "bad parameter provided"
        };
        responseGenerator(res, 400, responseJson);

        return;
    }

    const query = "insert into user(username, phonenumber, name, teamcolor, health, ticket, score)" + 
        ' value (?)';
    const data = [
        req.body.username,
        req.body.phonenumber,
        req.body.name,
        req.body.teamColor,
        req.body.health,
        req.body.ticket,
        req.body.score 
    ];

    sqlConnection.query(query, [data], function (err, result, fields) {
        if (err) throw err;

        responseJson = {
              "message": "user created"
            
        };
        responseGenerator(res, 201, responseJson);
    });

}

function checkParameters(req)
{
    if(req.body.username == undefined || req.body.username == null ||
        req.body.phonenumber == undefined || req.body.phonenumber == null ||
        req.body.name == undefined || req.body.name == null ||
        req.body.teamColor == undefined || req.body.teamColor == null ||
        req.body.health == undefined || req.body.health == null ||
        req.body.ticket == undefined || req.body.ticket == null ||
        req.body.score == undefined || req.body.score == null
    )
    {
        return false;
    }
    return true;
}


module.exports = handlePostRequest;
