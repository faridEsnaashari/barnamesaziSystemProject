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

    const query = "select * from gamestatus where label = '" + req.query.label + "'";

    sqlConnection.query(query, function (err, result, fields) {
        if (err) throw err;

        if(result[0] == undefined)
        {
            const responseJson = {
              "message": "game not found"
            };
            responseGenerator(res, 404, responseJson);
            return;
        }
        const game = {
            label : result[0].label,
            startedtime : result[0].startedtime,
            duration : result[0].duration
        };
        responseGenerator(res, 200, game);
    });

}

function checkParameters(req)
{
    if(req.query.label == undefined)
    {
        return false;
    }
    return true;
}

module.exports = handleGetRequest;
