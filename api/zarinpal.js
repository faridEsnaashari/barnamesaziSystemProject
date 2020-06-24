const zarinpalCheckout = require('zarinpal-checkout');

const zarinpal = zarinpalCheckout.create('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', true);

function pay(res, amount, userId){
    zarinpal.PaymentRequest({
        Amount: amount,
        CallbackURL: 'http://localhost:3000/pay/verify?userid=' + userId + '&amount=' + amount,
        Description: 'pay for the game'
    }).then(function (response) {
        if (response.status == 100) {
            res.redirect(response.url);
        }

    }).catch(function (err) {
        console.log(err);
    });
}

function verify(amount, authority, callback){
    zarinpal.PaymentVerification({
    Amount: amount,
    Authority: authority,

    }).then(function (response) {
        if (response.status == 100) {
            return response.RefID;
        } 
        else {
            return "failed";
        }
    }).then(function (result){
        callback(result);
    }).catch(function (err) {
        throw err;
    });
}

const zarinpalFunctions = {
    pay : pay,
    verify : verify
};

module.exports = zarinpalFunctions;
