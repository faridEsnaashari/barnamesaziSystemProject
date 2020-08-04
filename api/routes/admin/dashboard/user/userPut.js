const sqlConnection = require('../../../../sqlConnection');

function handleUser(req, res) {
    if(!req.session.token){
        const response = {
            message : "access denied. please login first."
        }
        res.status(403).json(response);
        return;
    }

    if(!checkParameters(req)){
        const response = {
            message : "bad parameter provided"
        }
        res.status(400).json(response);
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
                    "message" : "these/this user(s) not found",
                    users : queryExceptions
                }
                res.status(409).json(responseJson);
            }
            else{
                responseJson = {
                    "message": "user(s) updated"
                };
                res.status(200).json(responseJson);
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
    for(user in req.body.users){
        eachUser = req.body.users[user];
        subQuery = `update user set active = ${ eachUser.active } where userId = ${ eachUser.id }`;
        query.push(subQuery);
    }
    return query;
}

function getItemIdFromQuery(query){
    const equalPosition = query.lastIndexOf("=");
    return query.slice(equalPosition + 2, query.length);
}

function checkParameters(req){
    if(!req.body.users || req.body.users.length < 1){
        return false;
    }
    for(let user in req.body.users){
        if(Object.keys(req.body.users[user]).length !== 2){
            return false;
        }
        else{
            const eachUser = req.body.users[user];
            if(!eachUser.id || eachUser.active == undefined || eachUser.active == null){
                return false;
            }
        }
    }
    return true;
}

module.exports = handleUser;
