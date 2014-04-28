'use strict';

var setexpresscheckout = function SetExpressCheckoutModel() {

    var transaction = require('../Base/transaction')();
    transaction.setDefaultParameters({
        METHOD: "SetExpressCheckout"
    });
    transaction.setValidationParameters(['RETURNURL', 'CANCELURL', 'PAYMENTREQUEST_0_PAYMENTACTION', 'PAYMENTREQUEST_0_AMT', 'PAYMENTREQUEST_0_CURRENCYCODE']);
    return transaction;
};

module.exports = setexpresscheckout;