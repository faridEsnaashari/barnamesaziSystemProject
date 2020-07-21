const responseGenerator = require('../../responseGenerator');
const sqlConnection = require('../../sqlConnection');
const token = require('../../token');

function handleGetRequest(req, res)
{
    if(!checkParameters(req))
    {
        const responseJson = {
            message : "bad parameter provided"
        };
        responseGenerator.sendJson(res, 400, responseJson);

        return;
    }

    const score = req.query.score;
    const userToken = req.query.usertoken;

    let userId = null;
    try{
        userId = token.verify(userToken);
    }
    catch(err){
        const responseJson = {
            message : "user unauthorized"
        };
        responseGenerator.sendJson(res, 401, responseJson);

        return;
    }

    const updateUserScoreQuery = "update user set score = score + " + score + " where userId = " + userId;
 
    sqlConnection.query(updateUserScoreQuery, function (err, result, fields) {
        if (err) throw err;

        const getActiveGameQuery = "select id from gamestatus where active = true";
        sqlConnection.query(getActiveGameQuery, function (err, result, fields) {
            if(err) throw err;

            activeGameId = result[0].id;
            const checkTableQuery = "select * from activegamescore where gameId = " + activeGameId + " and userId = " + userId; 
            sqlConnection.query(checkTableQuery, function (err, result, fields) {
                if(err) throw err;

                let changeScoreQuery = ""; 
                if(result[0] == undefined){
                    changeScoreQuery = "insert into activegamescore(userId, gameId, score) value(" + userId + ", " + activeGameId + ", " + score + ")";
                }
                else{
                    changeScoreQuery = "update activegamescore set score = score +" + score + " where gameId = " + activeGameId + " and userId = " + userId;
                }
                sqlConnection.query(changeScoreQuery, function (err, result, fields) {
                    if(err) throw err;
                    const responseJson = {
                        message : "user score updated"
                    };
                    responseGenerator.sendJson(res, 200, responseJson);

                    return;
                });
            });
        });
    });

}

function checkParameters(req)
{
//    if(req.query.phonenumber == undefined && req.query.username == undefined)
//    {
//        return false;
//    }
//    return true;
    if(req.query.usertoken == undefined || req.query.score == undefined)
    {
        return false;
    }
    return true;
}

module.exports = handleGetRequest;
