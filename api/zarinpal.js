const zarinpalCheckout = require('zarinpal-checkout');

const zarinpal = zarinpalCheckout.create('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', true);

function pay(res, amount, userId, callback, itemId){
    zarinpal.PaymentRequest({
        Amount: amount,
        CallbackURL: 'http://localhost:3000/pay/verify?userid=' + userId + '&amount=' + amount + '&itemid=' + itemId,
        Description: 'pay for the game'
    }).then(function(response){
        callback(response, res);
    }).catch(function (err) {
        throw err;
    });
}

function verify(itemId, res, userId, amount, authority, callback){
    zarinpal.PaymentVerification({
    Amount: amount,
    Authority: authority,

    }).then(function (response) {
        if (response.status == 100 || response.status == 101) {
            return response.RefID;
        } 
        else {
            return "failed";
        }
    }).then(function (result){
        callback(res, result, userId, amount, itemId);
    }).catch(function (err) {
        throw err;
    });
}

const zarinpalFunctions = {
    pay : pay,
    verify : verify
};

module.exports = zarinpalFunctions;
