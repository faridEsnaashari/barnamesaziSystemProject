const sqlConnection = require(`${ global.path.tools.mysqlConnection }`);

function handleQuestion(req, res) {
    if(!req.session.token){
        const response = {
            message : "access denied. please login first."
        }
        res.status(403).json(response);
        return;
    }

    if(!checkParameters(req)){
        const response = {
            message : "bad parameter provided"
        }
        res.status(400).json(response);
        return;
    }

    const query = generateUpdateQuery(req);
    sqlConnection.query(query, function (err, result, fields) {
        if(result.affectedRows === 0){
            const response = {
                message : "game(s) not found."
            }
            res.status(409).json(response);
        }
        else{
            const response = {
                message : "game(s) deleted."
            }
            res.status(200).json(response);
        }
    });
}

function generateUpdateQuery(req){
    let query = "delete from gamestatus where ";
    req.body.games.forEach(function(value){
        query += `id = ${ value } || `;
    });
    query = query.slice(0, query.length - 3);
    return query;
}

function checkParameters(req){
    if(!req.body.games || req.body.games.length < 1){
        return false;
    }
    return true;
}

module.exports = handleQuestion;
