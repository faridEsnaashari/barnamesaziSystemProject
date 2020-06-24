const responseGenerator = require('../../responseGenerator');
const sqlConnection = require('../../sqlConnection');

function handleGetRequest(req, res)
{
    const query = "select * from question order by rand() limit 1"

    sqlConnection.query(query, function (err, result, fields) {
        if (err) throw err;

        const question = {
            id : result[0].id,
            question: result[0].question,
            answer1 : result[0].answer1,
            answer2 : result[0].answer2,
            answer3 : result[0].answer3,
            answer4 : result[0].answer4,
            currect : result[0].currect
        };
        responseGenerator(res, 200, question);
    });

}

module.exports = handleGetRequest;
