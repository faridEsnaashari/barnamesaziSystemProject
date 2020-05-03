const responseGenerator = require('../../responseGenerator.js');
function handleGetRequest(req, res)
{
    if(!checkParameters(req))
    {
        responseJson = {
            message : "bad parameter provided"
        };
        responseGenerator(res, 400, responseJson)

        return;
    }
    let user = {
        username : undefined,
        phonenumber : undefined,
        name : undefined,
        teamColor : undefined,
        health : undefined,
        ticket : undefined,
        score : undefined
    }
    responseGenerator(res, 200, user)
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
