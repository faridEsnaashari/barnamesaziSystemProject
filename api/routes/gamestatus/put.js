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
                "message" : "game not found"
            };
            responseGenerator(res, 404, responseJson);
            return;
        }
        responseJson = {
              "message": "game updated"
        };
        responseGenerator(res, 200, responseJson);
    });

}

function generateUpdateQuery(req){
    let query = "update gamestatus " +
        "set ";
    if(!(req.body.duration == undefined)){
       query += "duration = " + "\'" + req.body.duration + "\'"; 
    }


    query += " where ";
    if(!(req.body.label == undefined)){
       query += "label = " + "\'" + req.body.label + "\'"; 
    }

    return query;
}

function checkParameters(req)
{
    if(req.body.label == undefined || req.body.label == null)
    {
        return false;
    }
    if(req.body.duration == undefined || req.body.duration == null)
    {
        return false;
    }
    return true;
}


module.exports = handlePutRequest;
