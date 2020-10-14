const sqlConnection = require(`${ global.path.tools.mysqlConnection }`);
const token = require(`${ global.path.tools.token }`);

function handleGetRequest(req, res)
{
    if(!checkParameters(req))
    {
        res.responseController.error(400, "bad parameter provided");
        return;
    }

    let questionQuery = [];
    if(req.query.lownumber != undefined && req.query.highnumber != undefined){
        const limit = req.query.highnumber - req.query.lownumber;
        questionQuery = "select * from question limit " + limit + " offset " + req.query.lownumber;
        
    }
    else{
        const userToken = req.query.usertoken;

        var userId = null;
        try{
            userId = token.verify(userToken);
        }
        catch(err){
            res.responseController.error(401, "user unauthorized");
            return;
        }

        questionQuery = "select * from question inner join (select * from(select * from (select id from question union all select questionId from answeredquestion where userId = " + userId + ")as tbl group by id having count(*)=1)as tbl2  order by rand() limit 1)as tbl3 on tbl3.id = question.id";
    }

    sqlConnection.query(questionQuery, function (err, result, fields) {
        if (err) throw err;

        if(result[0] == undefined){
            res.responseController.error(404, "there is no more question");
            return;
        }

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

        if(req.query.usertoken != undefined){
            answeredQuery = "insert into answeredquestion value(" + userId + ", " + result[0].id + ")";
            sqlConnection.query(answeredQuery, function (err, result, fields) {
                if(err) throw err;

                const responseJson = {
                    questions : questions
                };
                res.responseController.send(200, null, responseJson);
            });
        }
        else{
            const responseJson = {
                questions : questions
            };
            res.responseController.send(200, null, responseJson);
        }
    });

}

function checkParameters(req)
{
    if(req.query.usertoken == undefined || req.query.usertoken == null) {
        if((req.query.lownumber == undefined || req.query.lownumber == null) && (req.query.highnumber == undefined || req.query.highnumber == null)){
            return false;
        }
    }
    return true;
}

module.exports = handleGetRequest;
