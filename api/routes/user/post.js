const responseGenerator = require('../../responseGenerator');
const sqlConnection = require('../../sqlConnection');

function handlePostRequest(req, res)
{
    if(!checkParameters(req))
    {
        const responseJson = {
            message : "bad parameter provided"
        };
        responseGenerator.sendJson(res, 400, responseJson);

        return;
    }

    const query = "insert into user(username, phonenumber, name, teamcolor)" + 
        ' value (?)';
    const data = [
        req.body.username,
        req.body.phonenumber,
        req.body.name,
        req.body.teamColor
    ];

    sqlConnection.query(query, [data], function (err, result, fields) {
        if (err){
            if(err.code === 'ER_DUP_ENTRY'){
                responseJson = {
                    "message" : "user existed"
                }
                responseGenerator.sendJson(res, 409, responseJson);
                return;
            }
            else 
            {
                throw err;
            }
        }

        responseJson = {
              "message": "user created"
        };
        responseGenerator.sendJson(res, 201, responseJson);
    });

}

function checkParameters(req)
{
    if(req.body.username == undefined || req.body.username == null ||
        req.body.phonenumber == undefined || req.body.phonenumber == null ||
        req.body.name == undefined || req.body.name == null ||
        req.body.teamColor == undefined || req.body.teamColor == null
    )
    {
        return false;
    }
    return true;
}


module.exports = handlePostRequest;
