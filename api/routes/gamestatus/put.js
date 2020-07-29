const responseGenerator = require('../../responseGenerator');
const sqlConnection = require('../../sqlConnection');

function handlePutRequest(req, res)
{
    if(!checkParameters(req))
    {
        const responseJson = {
            message : "bad parameter provided"
        };
        responseGenerator.sendJson(res, 400, responseJson);

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
                    "message" : "these/this game(s) not found",
                    games : queryExceptions
                }
                responseGenerator.sendJson(res, 409, responseJson);
            }
            else{
                responseJson = {
                    "message": "games updated"
                };
<<<<<<< HEAD
                responseGenerator.sendJson(res, 200, responseJson);
=======
                responseGenerator(res, 200, responseJson);
>>>>>>> dbc9b9f6a573b95d64ff3980aacab7f29adf5074
            }
        })
        .catch(function(error){
            console.error(error);
        });
}

function callback(data){
    if(data.result.affectedRows === 0){
        data.queryExceptions.push(getGameIdFromQuery(data.query[data.queryCounter]));
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
    for(game in req.body.games){
        eachGame = req.body.games[game];
        subQuery = "update gamestatus set label = \'" + eachGame.label + "\', duration = " + eachGame.duration + " where id = " + eachGame.id;
        query.push(subQuery);
    }
    return query;
}

function getGameIdFromQuery(query){
    const equalPosition = query.lastIndexOf("=");
    return query.slice(equalPosition + 2, query.length);
}

function checkParameters(req)
{
    if(req.body.games == undefined || req.body.games == null){
        return false;
    }
    for(let game in req.body.games){
        if(Object.keys(req.body.games[game]).length < 1){
            return false;
        }
        else{
            const eachGame = req.body.games[game];
            if(
                (eachGame.id == undefined || eachGame.id == null)||
                (eachGame.label == undefined || eachGame.label == null)||
                (eachGame.duration == undefined || eachGame.duration == null)
            ){
                return false;
            }

        }
    }
    return true;
}


module.exports = handlePutRequest;
