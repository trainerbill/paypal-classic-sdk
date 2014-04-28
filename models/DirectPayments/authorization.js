'use strict';

var authorization = function AuthorizationModel() {

    var transaction = require('../Base/transaction')();
    transaction.setDefaultParameters({
        PAYMENTACTION: "Authorization",
        METHOD: "DoDirectPayment"

    });
    transaction.setValidationParameters(['PAYMENTACTION', 'AMT', 'IPADDRESS', 'ACCT', 'EXPDATE', 'CVV2', 'FIRSTNAME', 'LASTNAME', 'STREET', 'CITY', 'STATE', 'COUNTRYCODE', 'ZIP']);
    return transaction;
};

module.exports = authorization;