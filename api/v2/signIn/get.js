const sqlConnection = require(`${ global.path.tools.mysqlConnection }`);
const token = require(`${ global.path.tools.token }`);



function handleGetRequest(req, res){
    if(!checkParameters(req)) {
        res.responseController.error(400, "bad parameter provided");
        return;
    }
    const userPhoneNumber = req.query.phonenumber;

    const query = "SELECT * FROM user where phonenumber = '" + userPhoneNumber + "'";

    sqlConnection.query(query, function (err, result, fields) {
        if (err) throw err;

        if(result[0] == undefined)
        {
            res.responseController.error(404, "user not found");
            return;
        }
        const userId = result[0].userId; 
        const userToken = {
            token : token.create(userId)
        };
        res.responseController.send(200, "user signed in", userToken);
    });
}

function checkParameters(req) {
    if(req.query.phonenumber == undefined || req.query.phonenumber == null){
        return false;
    }
    return true;
}


module.exports = handleGetRequest;
