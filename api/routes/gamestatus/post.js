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

    const query = "insert into gamestatus(label, duration)" + 
        ' value (?)';
    const data = [
        req.body.label,
        req.body.duration
    ];

    sqlConnection.query(query, [data], function (err, result, fields) {
        if (err) throw err;

        responseJson = {
              "message": "game created"
        };
        responseGenerator(res, 201, responseJson);
    });

}

function checkParameters(req)
{
    if(req.body.label == undefined || req.body.label == null ||
        req.body.duration == undefined || req.body.duration == null
    )
    {
        return false;
    }
    return true;
}


module.exports = handlePostRequest;
