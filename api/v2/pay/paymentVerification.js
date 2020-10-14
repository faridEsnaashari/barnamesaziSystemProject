const zarinpal = require(`${ global.path.tools.zarinpal }`);
const sqlConnection = require(`${ global.path.tools.mysqlConnection }`);

function handlePaymentVerificationRequest(req, res){

    const requestStatus = req.query.Status;
    if(requestStatus !== 'OK'){
        res.responseController.error(406, "payment process failed");
        return;
    }

    const amount = req.query.amount;
    const userId = req.query.userid;
    const authority = req.query.Authority;
    const itemId = req.query.itemid;


    zarinpal.verify(itemId, res, userId, amount, authority, callback);
}

const callback = (res, refid, userId, amount, itemId) => {
    if(refid === "failed"){
        res.responseController.error(406, "payment process failed");
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

        const query = "select * from store where id = " + itemId;
        sqlConnection.query(query, [data], function (err, result, fields) {
            if(err) throw err;

            const query = "update user set " + result[0].name + " = " + result[0].name + " + " + result[0].count + " where userId = " + userId;
            sqlConnection.query(query, [data], function (err, result, fields) {
                if(err) throw err;

                const responseJson = {
                    RefID : refid,
                };
                res.responseController.send(200, "payment accepted", responseJson);
                return;
            });
        });

    });
}
module.exports = handlePaymentVerificationRequest;

