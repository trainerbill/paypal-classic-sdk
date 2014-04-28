"use strict";

var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

var paypal_classic_sdk = require('../');
require('./configure');


describe('SDK', function () {
    describe('Execute', function () {
        it('should return ACK Success', function (done) {
            var data = {
                METHOD: "DoDirectPayment",
                PAYMENTACTION: "Sale",
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

            paypal_classic_sdk.execute(data, function (err, res) {
                if (err) { done(err); }
                expect(err).equal(null);
                expect(res.response.decoded.ACK).equal("Success");
                done();
            });
        });
        it('Should return objects', function () {

            paypal_classic_sdk.getModel("sale").should.be.a('object');
            paypal_classic_sdk.getModel("authorization").should.be.a('object');
            paypal_classic_sdk.getModel("capture").should.be.a('object');
            paypal_classic_sdk.getModel("refund").should.be.a('object');
            paypal_classic_sdk.getModel("reference").should.be.a('object');
            paypal_classic_sdk.getModel("void").should.be.a('object');
            paypal_classic_sdk.getModel("setexpresscheckout").should.be.a('object');
            paypal_classic_sdk.getModel("getexpresscheckout").should.be.a('object');
            paypal_classic_sdk.getModel("doexpresscheckout").should.be.a('object');
        });
    });
});