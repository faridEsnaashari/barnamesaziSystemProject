const responseGenerator = require('../../responseGenerator');
const sqlConnection = require('../../sqlConnection');

function handlePutRequest(req, res)
{
    if(!checkParameters(req))
    {
        const responseJson = {
            message : "bad parameter provided"
        };
        responseGenerator.sendJson(res, 400, responseJson);

        return;
    }

    const query = generateUpdateQuery(req);
    let queryCounter = query.length - 1;
    let queryExceptions = [];

    executeQuery(query, queryCounter, queryExceptions)
        .then(function(data){
            return callback(data)
        })
        .then(function(){
            if(queryExceptions.length > 0){
                responseJson = {
                    "message" : "these/this question(s) not found",
                    questions : queryExceptions
                }
                responseGenerator.sendJson(res, 409, responseJson);
            }
            else{
                responseJson = {
                    "message": "questions updated"
                };
                responseGenerator.sendJson(res, 200, responseJson);
            }
        })
        .catch(function(error){
            console.error(error);
        });
}

function callback(data){
    if(data.result.affectedRows === 0){
        data.queryExceptions.push(getQuestionIdFromQuery(data.query[data.queryCounter]));
    }
    data.queryCounter--;
    if(!(data.queryCounter === -1)){
        return new Promise(function(resolve, reject){
            executeQuery(data.query, data.queryCounter, data.queryExceptions)
            .then(function(data){
                return callback(data)
            })
            .then(function(data){
                resolve(data)
            })
            .catch(function(error){
                console.error(error);
            });
        })
    }
}

function executeQuery(query, queryCounter, queryExceptions){
    return new Promise(function(resolve, reject){
        sqlConnection.query(query[queryCounter], function(err, result, fields){
            if(err){
                reject(err);
            }
            else{
                data = {
                    query : query,
                    queryCounter : queryCounter,
                    queryExceptions : queryExceptions,
                    result : result
                }
                resolve(data);
            }
        });
    });
}

function generateUpdateQuery(req){
    let query = [];
    for(question in req.body.questions){
        eachQuestion = req.body.questions[question];
        subQuery = "update question set question = \'" + eachQuestion.question + "\', answer1 = \'" + eachQuestion.answer1 + "\', answer2 = \'" + eachQuestion.answer2 + "\', answer3 = \'" + eachQuestion.answer3 + "\', answer4 = \'" + eachQuestion.answer4 + "\' , currect = " + eachQuestion.currect + " where id = " + eachQuestion.id;
        query.push(subQuery);
    }
    return query;
}

function getQuestionIdFromQuery(query){
    const equalPosition = query.lastIndexOf("=");
    return query.slice(equalPosition + 2, query.length);
}

function checkParameters(req)
{
    if(req.body.questions == undefined || req.body.questions == null){
        return false;
    }
    for(let question in req.body.questions){
        if(Object.keys(req.body.questions[question]).length < 1){
            return false;
        }
        else{
            const eachQuestion = req.body.questions[question];
            if(
                (eachQuestion.id == undefined || eachQuestion.id == null)||
                (eachQuestion.question == undefined || eachQuestion.question == null)||
                (eachQuestion.answer1 == undefined || eachQuestion.answer1 == null)||
                (eachQuestion.answer2 == undefined || eachQuestion.answer2 == null)||
                (eachQuestion.answer3 == undefined || eachQuestion.answer3 == null)||
                (eachQuestion.answer4 == undefined || eachQuestion.answer4 == null)||
                (eachQuestion.currect == undefined || eachQuestion.currect == null)
            ){
                return false;
            }

        }
    }
    return true;
}


module.exports = handlePutRequest;
