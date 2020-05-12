const responseGenerator = require('../../responseGenerator');
const sqlConnection = require('../../sqlConnection');

function handleGetRequest(req, res)
{
    const query = "select * from store"

    sqlConnection.query(query, function (err, result, fields) {
        if (err) throw err;

        console.log(result);
        const storeItem = {
            coin : {
                count : result[0].count, 
                price : result[0].price
            },
            health : {
                count : result[1].count, 
                price : result[1].price
            },
            ticket : {
                count : result[2].count, 
                price : result[2].price
            }
        };
        responseGenerator(res, 200, storeItem);
    });

}

module.exports = handleGetRequest;
