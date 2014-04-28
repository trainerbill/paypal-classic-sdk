'use strict';

var paypal_classic_sdk = require('../../');
require('../../test/configure');
var setec = paypal_classic_sdk.getModel("setexpresscheckout");

var data = {
    PAYMENTREQUEST_0_PAYMENTACTION: "Sale",
    PAYMENTREQUEST_0_CURRENCYCODE: "USD",
    RETURNURL: "http://localhost",
    CANCELURL: "http://localhost",
    PAYMENTREQUEST_0_AMT: "100.00"

};

try {
    setec.exchangeData(data);
    setec.validateData();

    paypal_classic_sdk.execute(setec.getParameters(), function (err, res) {
        if (err) { throw err; }
        console.log('Success');
        console.log(res);
    });

}
catch (err)
{
    console.log(err);
}