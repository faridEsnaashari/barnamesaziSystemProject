const sqlConnection = require(`${ global.path.tools.mysqlConnection }`);

function handlePostRequest(req, res)
{
    if(!checkParameters(req))
    {
        res.responseController.error(400, "bad parameter provided");
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
        res.responseController.error(201, "game created");
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
