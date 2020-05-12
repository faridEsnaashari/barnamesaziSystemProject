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
                "message" : "item not found"
            };
            responseGenerator(res, 404, responseJson);
            return;
        }
        responseJson = {
              "message": "item updated"
        };
        responseGenerator(res, 200, responseJson);
    });

}

function generateUpdateQuery(req){
    let query = null;
    for(item in req.body){
        query = "update store " + 
            "set " + 
            "count = " + req.body[item].count +
            ", price = " + req.body[item].price + 
            " where name = '" + item + "'";
    }
    return query;
}

function checkParameters(req)
{
    for(let item in req.body){
        if(
            (req.body[item].count == undefined || req.body[item].count == null) ||
            (req.body[item].price == undefined || req.body[item].price == null)
        ){
            return false;
        }
    }
    if(Object.keys(req.body).length != 1){
        return false;
    }
    return true;
}


module.exports = handlePutRequest;
