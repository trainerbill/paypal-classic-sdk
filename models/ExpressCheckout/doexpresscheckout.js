'use strict';

var doexpresscheckout = function DoExpressCheckoutModel() {

    var transaction = require('../Base/transaction')();
    transaction.setDefaultParameters({
        METHOD: "DoExpressCheckoutPayment"
    });
    transaction.setValidationParameters(['TOKEN', 'PAYERID', 'PAYMENTREQUEST_0_AMT']);
    return transaction;
};

module.exports = doexpresscheckout;