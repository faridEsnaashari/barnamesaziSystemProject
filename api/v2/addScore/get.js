const sqlConnection = require(`${ global.path.tools.mysqlConnection }`);
const token = require(`${ global.path.tools.token }`);

function handleGetRequest(req, res)
{
    if(!checkParameters(req))
    {
        res.responseController.error(400, "bad parameter provided");
        return;
    }

    const score = req.query.score;
    const userToken = req.query.usertoken;

    let userId = null;
    try{
        userId = token.verify(userToken);
    }
    catch(err){
        res.responseController.error(401, "user unauthorized");
        return;
    }

    const updateUserScoreQuery = "update user set score = score + " + score + " where userId = " + userId;

    sqlConnection.query(updateUserScoreQuery, function (err, result, fields) {
        if (err) throw err;

        const checkTableQuery = "select * from activegamescore where userId = " + userId; 
        sqlConnection.query(checkTableQuery, function (err, result, fields) {
            if(err) throw err;

            let changeScoreQuery = ""; 
            if(result[0] == undefined){
                changeScoreQuery = "insert into activegamescore(userId, score) value(" + userId + ", " + score + ")";
            }
            else{
                changeScoreQuery = "update activegamescore set score = score +" + score + " where userId = " + userId;
            }
            sqlConnection.query(changeScoreQuery, function (err, result, fields) {
                if(err) throw err;
                res.responseController.send(200, "user score updated");
                return;
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
