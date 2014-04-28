'use strict';

var reference = function ReferenceModel() {

    var transaction = require('../Base/transaction')();
    transaction.setDefaultParameters({
        METHOD: "DoReferenceTransaction"
    });
    transaction.setValidationParameters(['AMT', 'REFERENCEID', 'PAYMENTACTION']);
    return transaction;
};

module.exports = reference;