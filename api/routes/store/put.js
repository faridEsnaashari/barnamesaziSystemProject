const responseGenerator = require('../../responseGenerator');
const sqlConnection = require('../../sqlConnection');

function handlePutRequest(req, res){
    if(!checkParameters(req))
    {
        const responseJson = {
            message : "bad parameter provided"
        };
        responseGenerator(res, 400, responseJson);

        return;
    }

    const query = generateUpdateQuery(req);
    let queryCounter = query.length - 1;
    let queryExceptions = [];

    executeQuery(query, queryCounter, queryExceptions)
        .then(function(data){
            return callback(data)
        })
        .then(function(){
            if(queryExceptions.length > 0){
                responseJson = {
                    "message" : "these/this item(s) not found",
                    items : queryExceptions
                }
                responseGenerator(res, 409, responseJson);
            }
            else{
                responseJson = {
                    "message": "item updated"
                };
                responseGenerator(res, 200, responseJson);
            }
        })
        .catch(function(error){
            console.error(error);
        });
}

function callback(data){
    if(data.result.affectedRows === 0){
        data.queryExceptions.push(getItemIdFromQuery(data.query[data.queryCounter]));
    }
    data.queryCounter--;
    if(!(data.queryCounter === -1)){
        return new Promise(function(resolve, reject){
            executeQuery(data.query, data.queryCounter, data.queryExceptions)
            .then(function(data){
                return callback(data)
            })
            .then(function(data){
                resolve(data)
            })
            .catch(function(error){
                console.error(error);
            });
        })
    }
}

function executeQuery(query, queryCounter, queryExceptions){
    return new Promise(function(resolve, reject){
        sqlConnection.query(query[queryCounter], function(err, result, fields){
            if(err){
                reject(err);
            }
            else{
                data = {
                    query : query,
                    queryCounter : queryCounter,
                    queryExceptions : queryExceptions,
                    result : result
                }
                resolve(data);
            }
        });
    });
}

function generateUpdateQuery(req){
    let query = [];
    for(item in req.body.items){
        eachItem = req.body.items[item];
        subQuery = "update store set count = " + eachItem.count + ", price = " + eachItem.price + " where id = " + eachItem.id;
        query.push(subQuery);
    }
    return query;
}

function getItemIdFromQuery(query){
    const equalPosition = query.lastIndexOf("=");
    return query.slice(equalPosition + 2, query.length);
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
                (eachItem.id == undefined || eachItem.id == null)||
                (eachItem.count == undefined || eachItem.count == null)||
                (eachItem.price == undefined || eachItem.price == null)
            ){
                return false;
            }

        }
    }
    return true;
}


module.exports = handlePutRequest;
