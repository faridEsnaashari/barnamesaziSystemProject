const sqlConnection = require(`${ global.path.tools.mysqlConnection }`);
const token = require(`${ global.path.tools.token }`);

function handlePostLogin(req, res) {
    if(!checkParameters(req)) {
        const response = {
            message : "bad parameter provided"
        }
        res.status(400).json(response);
        return;
    }

    const userName = req.body.username;
    const password = req.body.password.toString();

    const query = "select * from admin where username = \'" + userName + "\'"; 
    sqlConnection.query(query, function(err, result){
        if(err) throw err;

        if(!result[0] || result[0].password !== password){
            const response = {
                message : "wrong username or password"
            }
            res.status(401).json(response);
            return;
        }

        adminToken = token.create(result[0].adminId);
        req.session.token = adminToken;
        
        const response = {
            message : "acess granted"
        }
        res.status(200).json(response);
        return;
    });

}

function checkParameters(req){
    if(!req.body.username || !req.body.password){
        return false;
    }
    return true;
}
module.exports = handlePostLogin;
