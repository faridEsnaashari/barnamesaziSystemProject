const responseGenerator = require('../../responseGenerator');
const sqlConnection = require(`${ global.path.tools.mysqlConnection }`);

function handlePostRequest(req, res)
{
    if(!checkParameters(req))
    {
        const responseJson = {
            message : "bad parameter provided"
        };
        responseGenerator.sendJson(res, 400, responseJson);

        return;
    }

    const query = generateInsertQuery(req);

    sqlConnection.query(query, function (err, result, fields) {
        if (err) throw err;

        responseJson = {
              "message": "question(s) created"
        };
        responseGenerator.sendJson(res, 201, responseJson);
    });

}

function generateInsertQuery(req){
    let query = "insert into question(question, answer1, answer2, answer3, answer4, currect) values ";
    for(question in req.body.questions){
        const eachQuestion = req.body.questions[question];
        query += "(\'" + eachQuestion.question + "\', \'" + eachQuestion.answer1 + "\', \'" + eachQuestion.answer2 + "\', \'" + eachQuestion.answer3 + "\', \'" + eachQuestion.answer4 + "\', " +eachQuestion.currect + "),";
    }
    query = query.slice(0, query.length-1);
    return query;
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


module.exports = handlePostRequest;
