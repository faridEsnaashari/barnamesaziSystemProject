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

    const query = generateInsertQuery(req);

    sqlConnection.query(query, function (err, result, fields) {
        if (err) console.error(err);
        if(err.code === "ER_DUP_ENTRY"){
            const responseJson = {
                message : "item existed"
            };
            responseGenerator.sendJson(res, 409, responseJson);

            return;
        }

        responseJson = {
              "message": "item(s) created"
        };
        responseGenerator.sendJson(res, 201, responseJson);
    });

}

function generateInsertQuery(req){
    let query = "insert into store(name, count, price) values ";
    for(item in req.body.items){
        const eachItem = req.body.items[item];
        query += "(\'" + eachItem.name + "\', " + eachItem.count + ", " + eachItem.price + "),";
    }
    query = query.slice(0, query.length-1);
    return query;
}

function checkParameters(req)
{
    if(req.body.items == undefined || req.body.items == null){
        return false;
    }
    for(let item in req.body.items){
        if(Object.keys(req.body.items[item]).length < 1){
            return false;
        }
        else{
            const eachItem = req.body.items[item];
            if(
                (eachItem.name == undefined || eachItem.name == null)||
                (eachItem.count == undefined || eachItem.count == null)||
                (eachItem.price == undefined || eachItem.price == null)
            ){
                return false;
            }

        }
    }
    return true;
}


module.exports = handlePostRequest;
