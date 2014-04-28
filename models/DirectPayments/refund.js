'use strict';

var refund = function RefundModel() {

    var transaction = require('../Base/transaction')();
    transaction.setDefaultParameters({
        METHOD: "RefundTransaction"

    });
    transaction.setValidationParameters(['TRANSACTIONID', 'REFUNDTYPE']);
    return transaction;
};

module.exports = refund;