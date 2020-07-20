const responseGenerator = require('../../responseGenerator');
const sqlConnection = require('../../sqlConnection');

function handleGetRequest(req, res)
{
    let query = [];
    if(req.query.lownumber != undefined && req.query.highnumber != undefined){
        const limit = req.query.highnumber - req.query.lownumber;
        query = "select * from question limit " + limit + " offset " + req.query.lownumber;
        
    }
    else{
         query = "select * from question order by rand() limit 1";
    }

    sqlConnection.query(query, function (err, result, fields) {
        if (err) throw err;

        let questions = [];
        for(question in result){
            const questionRow = {
                id : result[question].id,
                question: result[question].question,
                answer1 : result[question].answer1,
                answer2 : result[question].answer2,
                answer3 : result[question].answer3,
                answer4 : result[question].answer4,
                currect : result[question].currect
            };
            questions.push(questionRow);
        }
        const responseJson = {
            questions : questions
        };
        responseGenerator(res, 200, responseJson);
    });

}

module.exports = handleGetRequest;
