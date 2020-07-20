const responseGenerator = require('../../responseGenerator');
const sqlConnection = require('../../sqlConnection');

function handleGetRequest(req, res)
{
    const query = "select * from store"

    sqlConnection.query(query, function (err, result, fields) {
        if (err) throw err;


        let healthArray = [];
        let ticketArray = [];
        let coinArray = [];

        for(const rownumber in result){
            if(result[rownumber].name === 'coin'){
                if(result[rownumber].count === 0){
                    continue;
                }
                coinArray.push({
                    id: result[rownumber].id,
                    count : result[rownumber].count,
                    price : result[rownumber].price
                });
            }
            if(result[rownumber].name === 'health'){
                if(result[rownumber].count === 0){
                    continue;
                }
                healthArray.push({
                    id: result[rownumber].id,
                    count : result[rownumber].count,
                    price : result[rownumber].price
                });
            }
            if(result[rownumber].name === 'ticket'){
                if(result[rownumber].count === 0){
                    continue;
                }
                ticketArray.push({
                    id: result[rownumber].id,
                    count : result[rownumber].count,
                    price : result[rownumber].price
                });
            }
        }

        const storeItem = {
            coin : coinArray,
            health : healthArray,
            ticket : ticketArray
        };
        responseGenerator(res, 200, storeItem);
    });

}

module.exports = handleGetRequest;
