'use strict';

var getexpresscheckout = function GetExpressCheckoutModel() {

    var transaction = require('../Base/transaction')();
    transaction.setDefaultParameters({
        METHOD: "GetExpressCheckoutDetails"
    });
    transaction.setValidationParameters(['TOKEN']);
    return transaction;
};

module.exports = getexpresscheckout;