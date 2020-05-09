const responseGenerator = require('../../responseGenerator');
const sqlConnection = require('../../sqlConnection');

function handlePutRequest(req, res)
{
    if(!checkParameters(req))
    {
        const responseJson = {
            message : "bad parameter provided"
        };
        responseGenerator(res, 400, responseJson);

        return;
    }

    const query = generateUpdateQuery(req);

    sqlConnection.query(query, function (err, result, fields) {
        if (err) throw err;

        if(result.affectedRows === 0){
            responseJson = {
                "message" : "user not found"
            };
            responseGenerator(res, 404, responseJson);
            return;
        }
        responseJson = {
              "message": "user updated"
        };
        responseGenerator(res, 200, responseJson);
    });

}

function generateUpdateQuery(req){
    let query = "update user " +
        "set ";
    if(!(req.body.name == undefined)){
       query += "name = " + "\'" + req.body.name + "\'"; 
    }
    if(!(req.body.teamColor == undefined)){
       query += ", teamcolor = " + "\'" + req.body.teamColor + "\'"; 
    }
    if(!(req.body.health == undefined)){
       query += ", health = " + "\'" + req.body.health + "\'"; 
    }
    if(!(req.body.ticket == undefined)){
       query += ", ticket = " + "\' " + req.body.ticket + "\'"; 
    }
    if(!(req.body.score == undefined)){
       query += ", score = " + "\'" + req.body.score + "\'"; 
    }


    query += " where ";
    if(!(req.body.username == undefined)){
       query += "username = " + "\'" + req.body.username + "\'"; 
    }
    if(!(req.body.phonenumber == undefined)){
       query += "phonenumber = " + "\'" + req.body.phonenumber + "\'"; 
    }

    return query;
}

function checkParameters(req)
{
    if((req.body.username == undefined || req.body.username == null) &&
        (req.body.phonenumber == undefined || req.body.phonenumber == null)
    )
    {
        return false;
    }
    if(
        (req.body.name == undefined || req.body.name == null) &&
        (req.body.teamColor == undefined || req.body.teamColor == null) &&
        (req.body.health == undefined || req.body.health == null) &&
        (req.body.ticket == undefined || req.body.ticket == null) &&
        (req.body.score == undefined || req.body.score == null)
    )
    {
        return false;
    }
    return true;
}


module.exports = handlePutRequest;
