const sqlConnection = require(`${ global.path.tools.mysqlConnection }`);

function handlePostRequest(req, res)
{
    if(!checkParameters(req))
    {
        res.responseController.error(400, "bad parameter provided");
        return;
    }

    const query = generateInsertQuery(req);

    sqlConnection.query(query, function (err, result, fields) {
        if (err) console.error(err);
        if(err.code === "ER_DUP_ENTRY"){
            const responseJson = {
                message : "item existed"
            };
            res.responseController.error(409, "item existed");

            return;
        }

        responseJson = {
              "message": "item(s) created"
        };
        res.responseController.send(201, "item(s) created");
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
