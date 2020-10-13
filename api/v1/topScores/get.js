const responseGenerator = require('../../responseGenerator');
const sqlConnection = require(`${ global.path.tools.mysqlConnection }`);

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

    const limit = req.query.limit;

    let query = "";
    if(req.query.activegame != undefined && req.query.activegame === "true"){
        query = "select user.userId, user.username, user.phonenumber, user.name, user.teamcolor, user.health, user.ticket, activegamescore.score, activegamescore.numberofticketused as activegame, user.numberofticketused as total from user left join activegamescore on user.userId = activegamescore.userId order by activegamescore.score desc, activegamescore.numberofticketused limit " + limit;
    }
    else{
        query = "select user.username, user.phonenumber, user.name, user.teamcolor, user.health, user.ticket, user.coin, user.score, user.numberofticketused as total, activegamescore.numberofticketused as activegame from user left join activegamescore on user.userId = activegamescore.userId order by user.score desc, user.numberofticketused limit " + limit;
    }
 

    sqlConnection.query(query, function (err, result, fields) {
        if (err) throw err;

        const user = []; 
        
        for(const rowNumber in result)
        {
            userDetail = {
                user : {
                    username : result[rowNumber].username,
                    phonenumber : result[rowNumber].phonenumber,
                    name : result[rowNumber].name,
                    teamColor : result[rowNumber].teamcolor,
                    health : result[rowNumber].health,
                    ticket : result[rowNumber].ticket,
                    score : result[rowNumber].score
                },
                countOfplayingGame : {
                    total : result[rowNumber].total || 0,
                    activeGame : result[rowNumber].activegame || 0
                }

            };            

            user.push(userDetail);
        }
        users = {
            users: user
        }
        responseGenerator.sendJson(res, 200, users);
    });

}

function checkParameters(req)
{
    if(req.query.limit == undefined)
    {
        return false;
    }
    return true;
}

module.exports = handleGetRequest;
