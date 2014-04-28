'use strict';

var paypal_classic_sdk = require('../../');
require('../../test/configure');
var auth = paypal_classic_sdk.getModel("authorization");
var cap = paypal_classic_sdk.getModel("capture");
var refund = paypal_classic_sdk.getModel("refund");
var data = {
    ACCT: "4716792779006088",
    EXPDATE: "112018",
    CVV2: "111",
    AMT: "100",
    IPADDRESS: "127.0.0.1",
    FIRSTNAME: "Fred",
    LASTNAME: "Flintstone",
    STREET: "123 Bedrock",
    CITY: "Omaha",
    STATE: "NE",
    ZIP: "68136",
    COUNTRYCODE: "US"
};

try {
    auth.exchangeData(data);
    auth.validateData();

    paypal_classic_sdk.execute(auth.getParameters(), function (err, res) {
        if (err) { throw err; }
        console.log('Authorization Success');
        console.log(res);
        cap.exchangeData({
            AUTHORIZATIONID: res.response.decoded.TRANSACTIONID,
            AMT: auth.getParameters().AMT,
            COMPLETETYPE: 'Complete'
        });
        paypal_classic_sdk.execute(cap.getParameters(), function (err, res) {
            if (err) { throw err; }
            console.log('Capture Success');
            console.log(res);
            refund.exchangeData({
                TRANSACTIONID: res.response.decoded.TRANSACTIONID,
                REFUNDTYPE: "Full"
            });
            refund.validateData();
            paypal_classic_sdk.execute(refund.getParameters(), function (err, res) {
                if (err) { throw err; }
                console.log('Refund Success');
                console.log(res);
            });
        });
    });

}
catch (err)
{
    console.log(err);
}