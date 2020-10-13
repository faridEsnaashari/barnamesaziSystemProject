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
            message : "question updated"
        }
        res.status(200).json(response);
        return;
    });
}

function generateUpdateQuery(req){
    const query = `update question set question = \'${ req.body.question }\', answer1 = \'${ req.body.answer1 }\', answer2 = \'${ req.body.answer2 }\', answer3 = \'${ req.body.answer3 }\', answer4 = \'${ req.body.answer4 }\', currect = ${ req.body.currect } where id = ${ req.body.questionId }`;
    return query;
}

function checkParameters(req){
    if(Object.keys(req.body).length !== 7){
        return false;
    }

    if(!req.body.questionId || !req.body.question || !req.body.answer1 || !req.body.answer2 || !req.body.answer3 || !req.body.answer4 || !req.body.currect){
        return false;
    }

    return true;
}

module.exports = handleQuestion;
