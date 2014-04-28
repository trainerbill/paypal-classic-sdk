'use strict';

var voidtrx = function VoidModel() {

    var transaction = require('../Base/transaction')();
    transaction.setDefaultParameters({
        METHOD: "DoVoid"
    });
    transaction.setValidationParameters(['AUTHORIZATIONID']);
    return transaction;
};

module.exports = voidtrx;