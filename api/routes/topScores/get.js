const responseGenerator = require('../../responseGenerator');
const sqlConnection = require('../../sqlConnection');

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
        query = "select user.userId, user.username, user.phonenumber, user.name, user.teamcolor, user.health, user.ticket, activegamescore.score, activegamescore.numberofticketused from user inner join activegamescore where user.userId=activegamescore.userId order by activegamescore.score desc, activegamescore.numberofticketused limit " + limit;
    }
    else{
        query = "select * from user order by score desc, numberofticketused limit " + limit;
    }
 

    sqlConnection.query(query, function (err, result, fields) {
        if (err) throw err;

        const user = []; 
        
        for(const rowNumber in result)
        {
            userDetail = {
                username : result[rowNumber].username,
                phonenumber : result[rowNumber].phonenumber,
                name : result[rowNumber].name,
                teamColor : result[rowNumber].teamcolor,
                health : result[rowNumber].health,
                ticket : result[rowNumber].ticket,
                score : result[rowNumber].score
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
