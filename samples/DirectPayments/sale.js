'use strict';

var paypal_classic_sdk = require('../../');
require('../../test/configure');
var sale = paypal_classic_sdk.getModel("sale");

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
    sale.exchangeData(data);
    sale.validateData();

    paypal_classic_sdk.execute(sale.getParameters(), function (err, res) {
        if (err) { throw err; }
        console.log('Success');
        console.log(res);
    });

}
catch (err)
{
    console.log(err);
}