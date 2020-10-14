const sqlConnection = require(`${ global.path.tools.mysqlConnection }`);

function handlePostRequest(req, res)
{
    if(!checkParameters(req))
    {
        res.responseController.error(400, "bad parameter provided");
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
                res.responseController.error(409, "user existed");
                return;
            }
            else 
            {
                throw err;
            }
        }
        res.responseController.send(201, "user created");
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
