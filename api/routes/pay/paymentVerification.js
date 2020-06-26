const responseGenerator = require('../../responseGenerator');
const zarinpal = require('../../zarinpal');
const sqlConnection = require('../../sqlConnection');

function handlePaymentVerificationRequest(req, res){

    const requestStatus = req.query.Status;
    if(requestStatus !== 'OK'){
        const responseJson = {
            message : 'payment process failed'
        };
        responseGenerator(res, 406, responseJson);
    }

    const amount = req.query.amount;
    const userId = req.query.userid;
    const authority = req.query.Authority;

    const callback = (refid) => {
        if(refid === 0){
            const responseJson = {
                message : 'payment process failed'
            };
            responseGenerator(res, 406, responseJson);
            return;
        }

        const query = "insert into transactions(userid, refid, amount)" + 
            ' value (?)';
        const data = [
            userId,
            refid,
            amount
        ];

        sqlConnection.query(query, [data], function (err, result, fields) {
            if (err) throw err;

            const responseJson = {
                RefID : refid,
                message : 'payment accepted'
            };
            responseGenerator(res, 200, responseJson);
        });
        return;
    }

    zarinpal.verify(amount, authority, callback);
}
module.exports = handlePaymentVerificationRequest;

