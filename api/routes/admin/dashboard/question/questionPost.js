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
            message : "question created"
        }
        res.status(200).json(response);
        return;
    });
}

function generateUpdateQuery(req){
    const query = `insert into question(question, answer1, answer2, answer3, answer4, currect) value(\'${ req.body.question }\', \'${ req.body.answer1 }\', \'${ req.body.answer2 }\', \'${ req.body.answer3 }\', \'${ req.body.answer4 }\', ${ req.body.currect })`;
    return query;
}

function checkParameters(req){
    if(Object.keys(req.body).length !== 6){
        return false;
    }

    if(!req.body.question || !req.body.answer1 || !req.body.answer2 || !req.body.answer3 || !req.body.answer4 || !req.body.currect){
        return false;
    }

    return true;
}

module.exports = handleQuestion;
