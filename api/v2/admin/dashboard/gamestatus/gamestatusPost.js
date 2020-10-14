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

    sqlConnection.query(query, function(err, result, field){
        if(err) console.error(err);

        const response = {
            message : "game created"
        }
        res.status(200).json(response);
        return;
    });
}

function generateUpdateQuery(req){
    const query = `insert into gamestatus(label, duration) value(\'${ req.body.label }\', ${ req.body.duration })`;
        console.log(query);
    return query;
}

function checkParameters(req){
    if(Object.keys(req.body).length !== 2){
        return false;
    }

    if(!req.body.label || !req.body.duration){
        return false;
    }

    return true;
}

module.exports = handleQuestion;
