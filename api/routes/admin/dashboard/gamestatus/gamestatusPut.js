const sqlConnection = require('../../../../sqlConnection');

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
            message : "question updated"
        }
        res.status(200).json(response);
        return;
    });
}

function generateUpdateQuery(req){
    const query = `update gamestatus set label = \'${ req.body.label }\', duration = ${ req.body.duration } where id = ${ req.body.gameId }`;
    return query;
}

function checkParameters(req){
    if(Object.keys(req.body).length !== 3){
        return false;
    }

    if(!req.body.gameId || !req.body.label || !req.body.duration){
        return false;
    }

    return true;
}

module.exports = handleQuestion;
