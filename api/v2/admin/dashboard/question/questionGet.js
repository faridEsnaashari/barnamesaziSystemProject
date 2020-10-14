const sqlConnection = require(`${ global.path.tools.mysqlConnection }`);

function handleQuestion(req, res) {
    if(!req.session.token){
        res.redirect("/admin/login");
        return;
    }

    if(!req.query.lownumber && !req.query.highnumber){
        res.render("dashboard/question",
            {
                title : "questions management",
                scriptSrc : "/views/scripts/dashboard/question.js",
                cssSrc : "/views/styles/dashboard/table.css"
            }
        );
        return;
    }

    const limit = req.query.highnumber - req.query.lownumber;
    const offset = req.query.lownumber;
    if(limit < 0 || offset < 0){
        const response = {
            message : "bad parameter provided"
        }
        res.status(400).json(response);
        return;
    }

    const query = "select * from question limit " + limit + " offset " + offset;

    sqlConnection.query(query, function (err, result, fields) {
        if(result.length === 0){
            const response = {
                message : "no more question"
            }
            res.status(404).json(response);
            return;
        }

        let questionsArray = [];
        result.forEach(function(question){
            questionObject = {
                questionId : question.id,
                question : question.question,
                answer1 : question.answer1,
                answer2 : question.answer2,
                answer3 : question.answer3,
                answer4 : question.answer4,
                currect : question.currect
            };
            questionsArray.push(questionObject);
        });

        const response = {
            questions : questionsArray
        };
        res.status(200).json(response);
        return;
    });
}

module.exports = handleQuestion;
