const responseGenerator = require('../../responseGenerator');
const sqlConnection = require('../../sqlConnection');

function handleDeleteRequest(req, res)
{
    console.log(req.body.username);
    if(!checkParameters(req))
    {
        const responseJson = {
            message : "bad parameter provided"
        };
        responseGenerator(res, 400, responseJson);

        return;
    }

    let query = null;
    if(req.body.phonenumber != undefined){
        query = "delete from user where phonenumber = '" + req.body.phonenumber + "'";
    }
    else{
        query = "delete FROM user where username = '" + req.body.username + "'";
    }

    console.log(query);
    sqlConnection.query(query, function (err, result, fields) {
        if (err) throw err;

        console.log(result);
        if(result.affectedRows === 0)
        {
            const responseJson = {
              "message": "user not found"
            };
            responseGenerator(res, 404, responseJson);
            return;
        }
        const responseJson = {
            "message" : "user deleted"
        }
        responseGenerator(res, 200, responseJson);
    });

}

function checkParameters(req)
{
    if(req.body.phonenumber == undefined && req.body.username == undefined)
    {
        return false;
    }
    return true;
}
module.exports = handleDeleteRequest;
