const responseGenerator = require('../../responseGenerator');
const sqlConnection = require('../../sqlConnection');

function handleDeleteRequest(req, res)
{
    if(!checkParameters(req))
    {
        const responseJson = {
            message : "bad parameter provided"
        };
        responseGenerator(res, 400, responseJson);

        return;
    }

    const query = generateDeleteQuery(req);
    let queryCounter = query.length - 1;
    let queryExceptions = [];

    executeQuery(query, queryCounter, queryExceptions)
        .then(function(data){
            return callback(data)
        })
        .then(function(){
            if(queryExceptions.length > 0){
                responseJson = {
                    "message" : "these/this question(s) not found",
                    questions : queryExceptions
                }
                responseGenerator(res, 409, responseJson);
            }
            else{
                responseJson = {
                    "message": "questions deleted"
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
        data.queryExceptions.push(getQuestionIdFromQuery(data.query[data.queryCounter]));
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

function generateDeleteQuery(req){
    let query = [];
    const ids = req.body.ids;

    ids.forEach(function(id){
        const subQuery = "delete from question where id = " + id;
        query.push(subQuery);
    });
    return query;
}

function getQuestionIdFromQuery(query){
    const equalPosition = query.lastIndexOf("=");
    return query.slice(equalPosition + 2, query.length);
}

function checkParameters(req)
{
    if(req.body.ids == undefined || req.body.ids == null){
        return false;
    }
    if(req.body.ids.length < 1){
        return false;
    }
    return true;
}


module.exports = handleDeleteRequest;
