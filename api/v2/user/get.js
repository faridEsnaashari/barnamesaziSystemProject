const token = require(`${ global.path.tools.token }`);
const sqlConnection = require(`${ global.path.tools.mysqlConnection }`);

function handleGetRequest(req, res)
{
    if(!checkParameters(req))
    {
        res.responseController.error(400, "bad parameter provided");
        return;
    }

    const userToken = req.query.usertoken;

    let userId = null;
    try{
        userId = token.verify(userToken);
    }
    catch(err){
        res.responseController.error(401, "user unauthorized");
        return;
    }

    const query = "select user.userId, user.username, user.phonenumber, user.name, user.teamcolor, user.health, user.ticket, user.coin, user.score, user.numberofticketused as countofplayinggame, activegamescore.numberofticketused as countofplayingcurrentgame from user left join activegamescore on activegamescore.userId = user.userId where user.userId = " + userId;
 
//    let query = null;
//    if(req.query.phonenumber != undefined){
//        query = "SELECT * FROM user where phonenumber = '" + req.query.phonenumber + "'";
//    }
//    else{
//        query = "SELECT * FROM user where username = '" + req.query.username + "'";
//    }

    sqlConnection.query(query, function (err, result, fields) {
        if (err) throw err;

        if(result[0] == undefined)
        {
            res.responseController.error(404, "user not found");
            return;
        }
        let user = {
            user : {
                username : result[0].username,
                phonenumber : result[0].phonenumber,
                name : result[0].name,
                teamColor : result[0].teamcolor,
                health : result[0].health,
                ticket : result[0].ticket,
                coin : result[0].coin,
                score : result[0].score
            },
            countOfplayingGame : {
                total : result[0].countofplayinggame || 0,
                activeGame : result[0].countofplayingcurrentgame || 0
            }

        };
        
        const teamMembersQuery = "select count(teamColor) as number, teamcolor from user group by teamcolor";
        sqlConnection.query(teamMembersQuery, function (err, result, fields) {
            let teamsMembersNumber = {};
            teamsMembersNumber[result[0].teamcolor] = result[0]['number'];
            teamsMembersNumber[result[1].teamcolor] = result[1]['number'];

            user['teamsMembersNumber'] = teamsMembersNumber;

            res.responseController.send(200, null, user);
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
    if(req.query.usertoken == undefined || req.query.usertoken == null)
    {
        return false;
    }
    return true;
}

module.exports = handleGetRequest;
