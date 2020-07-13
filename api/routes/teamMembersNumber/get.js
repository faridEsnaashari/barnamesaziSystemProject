const responseGenerator = require('../../responseGenerator');
const sqlConnection = require('../../sqlConnection');

function handleGetRequest(req, res)
{
    const query = "select count(teamColor) as number, teamcolor from user group by teamcolor";
 
    sqlConnection.query(query, function (err, result, fields) {
        if (err) throw err;

        let responseObject = {};
        responseObject[result[0].teamcolor] = result[0]['number'];
        responseObject[result[1].teamcolor] = result[1]['number'];

        responseGenerator(res, 200, responseObject);
    });

}

module.exports = handleGetRequest;
