const responseGenerator = require('../../responseGenerator');
const sqlConnection = require('../../sqlConnection');

function handlePostRequest(req, res)
{
    if(!checkParameters(req))
    {
        const responseJson = {
            message : "bad parameter provided"
        };
        responseGenerator(res, 400, responseJson);

        return;
    }

    const query = "insert into question(question, answer1, answer2, answer3, answer4, currect)" + 
        ' value (?)';
    const data = [
        req.body.question,
        req.body.answer1,
        req.body.answer2,
        req.body.answer3,
        req.body.answer4,
        req.body.currect
    ];

    sqlConnection.query(query, [data], function (err, result, fields) {
        if (err) throw err;

        responseJson = {
              "message": "question created"
        };
        responseGenerator(res, 201, responseJson);
    });

}

function checkParameters(req)
{
    if(req.body.question == undefined || req.body.question == null ||
        req.body.answer1 == undefined || req.body.answer1 == null ||
        req.body.answer2 == undefined || req.body.answer2 == null ||
        req.body.answer3 == undefined || req.body.answer3 == null ||
        req.body.answer4 == undefined || req.body.answer4 == null ||
        req.body.currect == undefined || req.body.currect == null
    )
    {
        console.log(req.body.question);
        console.log(req.body.answer1);
        console.log(req.body.answer2);
        console.log(req.body.answer3);
        console.log(req.body.answer4);
        console.log(req.body.currect);

        return false;
    }
    return true;
}


module.exports = handlePostRequest;
