const token = require(`${ global.path.tools.token }`);
const sqlConnection = require(`${ global.path.tools.mysqlConnection }`);

function handleDeleteRequest(req, res)
{
    if(!checkParameters(req))
    {
        res.responseController.error(400, "bad parameter provided");
        return;
    }

    const userToken = req.body.usertoken;

    let userId = null;
    try{
        userId = token.verify(userToken);
    }
    catch(err){
        res.responseController.error(401, "user unauthorized");
        return;
    }

    const query = "delete from user where userId = " + userId;
//    let query = null;
//    if(req.body.phonenumber != undefined){
//        query = "delete from user where phonenumber = '" + req.body.phonenumber + "'";
//    }
//    else{
//        query = "delete FROM user where username = '" + req.body.username + "'";
//    }

    sqlConnection.query(query, function (err, result, fields) {
        if (err) throw err;

        if(result.affectedRows === 0)
        {
            const responseJson = {
              "message": "user not found"
            };
            res.responseController.error(404, "user not found");
            return;
        }
        res.responseController.send(200, "user deleted");
    });

}

function checkParameters(req)
{
//    if(req.body.phonenumber == undefined && req.body.username == undefined)
//    {
//        return false;
//    }
//    return true;
    if(req.body.usertoken == undefined || req.body.usertoken == null){
        return false;
    }
    return true;
}
module.exports = handleDeleteRequest;
