'use strict';

var capture = function CaptureModel() {

    var transaction = require('../Base/transaction')();
    transaction.setDefaultParameters({
        METHOD: "DoCapture"
    });
    transaction.setValidationParameters(['AMT', 'AUTHORIZATIONID', 'COMPLETETYPE']);
    return transaction;
};

module.exports = capture;