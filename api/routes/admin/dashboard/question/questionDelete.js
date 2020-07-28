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
    sqlConnection.query(query, function (err, result, fields) {
        if(result.affectedRows === 0){
            const response = {
                message : "question(s) not found."
            }
            res.status(409).json(response);
        }
        else{
            const response = {
                message : "question(s) deleted."
            }
            res.status(200).json(response);
        }
    });
}

function generateUpdateQuery(req){
    let query = "delete from question where ";
    req.body.questions.forEach(function(value){
        query += `id = ${ value } || `;
    });
    query = query.slice(0, query.length - 3);
    return query;
}

function checkParameters(req){
    if(!req.body.questions || req.body.questions.length < 1){
        return false;
    }
    return true;
}

module.exports = handleQuestion;
