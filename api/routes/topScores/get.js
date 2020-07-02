const responseGenerator = require('../../responseGenerator');
const sqlConnection = require('../../sqlConnection');

function handleGetRequest(req, res)
{
    if(!checkParameters(req))
    {
        const responseJson = {
            message : "bad parameter provided"
        };
        responseGenerator(res, 400, responseJson);

        return;
    }

    const limit = req.query.limit;
    const query = "SELECT * FROM user order by score limit " + limit  + ";"
 

    sqlConnection.query(query, function (err, result, fields) {
        if (err) throw err;

        if(result[0] == undefined)
        {
            const responseJson = {
              "message": "user not found"
            };
            responseGenerator(res, 404, responseJson);
            return;
        }
        const user = {}; 
        
        for(const rowNumber in result)
        {
            user['user' + rowNumber] = {
                username : result[rowNumber].username,
                phonenumber : result[rowNumber].phonenumber,
                name : result[rowNumber].name,
                teamColor : result[rowNumber].teamcolor,
                health : result[rowNumber].health,
                ticket : result[rowNumber].ticket,
                score : result[rowNumber].score
            }            
        }
        responseGenerator(res, 200, user);
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
