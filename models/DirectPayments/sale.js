'use strict';

var sale = function SaleModel() {

    var transaction = require('../Base/transaction')();
    transaction.setDefaultParameters({
        METHOD: "DoDirectPayment",
        PAYMENTACTION: "Sale"
    });
    transaction.setValidationParameters(['PAYMENTACTION', 'AMT', 'IPADDRESS', 'ACCT', 'EXPDATE', 'CVV2', 'FIRSTNAME', 'LASTNAME', 'STREET', 'CITY', 'STATE', 'COUNTRYCODE', 'ZIP']);
    return transaction;
};

module.exports = sale;