const token = require(`${ global.path.tools.token }`);
const sqlConnection = require(`${ global.path.tools.mysqlConnection }`);

function handlePutRequest(req, res)
{
    if(!checkParameters(req))
    {
        res.responseController.error(400, "bad parameter provided");
        return;
    }
    
    const userToken = req.body.usertoken;
    let userId = null;
    try{
        userId = token.verify(userToken);
    }
    catch(err){
        res.responseController.error(401, "user unauthorized");
        return;
    }

    const query = generateUpdateQuery(req, userId);

    sqlConnection.query(query, function (err, result, fields) {
        if (err) throw err;

        if(result.affectedRows === 0){
            res.responseController.error(404, "user not found");
            return;
        }
        if(req.body.ticket != undefined){
                const checkTableQuery = "select * from activegamescore where userId = " + userId; 
                sqlConnection.query(checkTableQuery, function (err, result, fields) {
                    if(err) throw err;

                    let changeScoreQuery = ""; 
                    if(result[0] == undefined){
                        changeScoreQuery = "insert into activegamescore value(" + userId + ", 0, 1)";
                    }
                    else{
                        changeScoreQuery = "update activegamescore set numberofticketused = numberofticketused + 1 where userId = " + userId;
                    }
                    sqlConnection.query(changeScoreQuery, function (err, result, fields) {
                        if(err) throw err;
                        res.responseController.send(200, "user updated");
                        return;
                    });
                });
        }
        else{
            res.responseController.send(200, "user updated");
            return;
        }
    });

}

function generateUpdateQuery(req, userId){
    let query = "update user " +
        "set ";
    for(const field in req.body){
        if(field === "usertoken"){
            continue;
        }
        else if(field === "ticket"){
            query += field + " = " + field + " - 1"+ ", numberofticketused = numberofticketused + 1, " ;
        }
        else if(field === "health"){
            query += field + " = " + field + " - 1"+ ", ";
        }
        else if(field === "coin"){
            query += field + " = " + req.body[field] + ", ";
        }
        else{
            query += field + " = " + "\'" + req.body[field] + "\'" + ", ";
        }
    }
    query = query.substring(0, query.length - 2);
    query += " where userId = " + userId;
    return query;
}

function checkParameters(req)
{
    if(req.body.usertoken == undefined || req.body.usertoken == null)
    {
        return false;
    }
    if(req.body.score != undefined)
    {
        return false;
    }
    if(
        (req.body.name == undefined || req.body.name == null) &&
        (req.body.teamColor == undefined || req.body.teamColor == null) &&
        (req.body.health == undefined || req.body.health == null) &&
        (req.body.ticket == undefined || req.body.ticket == null) &&
        (req.body.coin == undefined || req.body.coin == null) 
    )
    {
        return false;
    }
    if(!(req.body.health == undefined || req.body.health == null))
       if(!(req.body.health === "decrease"))
    {
        return false;
    }
    if(!(req.body.ticket == undefined || req.body.ticket == null))
        if(!(req.body.ticket  === "decrease"))
    {
        return false;
    }
    return true;
}


module.exports = handlePutRequest;
