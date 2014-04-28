"use strict";

var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

var paypal_classic_sdk = require('../../../');
require('../../configure');

var auth = paypal_classic_sdk.getModel("authorization");
var cap = paypal_classic_sdk.getModel("capture");
var refund = paypal_classic_sdk.getModel("refund");

describe('RefundModel', function () {
    describe('Construction', function () {
        it('should return an object with the correct properties', function () {

            //Check parameters
            refund.getParameters().should.be.a('object');

            //Check default parameters
            refund.getDefaultParameters().should.be.a('object');
            refund.getDefaultParameters().should.have.property('METHOD');
            refund.getDefaultParameters().METHOD.should.equal("RefundTransaction");


            //Check validation parameters
            refund.getValidationParameters().should.be.a('array');
            refund.getValidationParameters().should.have.length(2);

        });
    });
    describe('exchangeData', function () {
        it('should populate the object parameters variable', function () {

            var data = {
                METHOD: "Test",
                TRANSACTIONID: "TestID",
                REFUNDTYPE: "Full"
            };


            refund.exchangeData(data);
            var params = refund.getParameters();
            params.should.have.property('METHOD');
            params.should.have.property('TRANSACTIONID');
            params.should.have.property('REFUNDTYPE');

            //METHOD should be overridden by the model defaults
            params.METHOD.should.equal("RefundTransaction");
            params.TRANSACTIONID.should.equal("TestID");
            params.REFUNDTYPE.should.equal("Full");
        });
    });

    describe('validateData', function () {
        it('Should not throw', function () {
            var data = {
                TRANSACTIONID: "TestID",
                REFUNDTYPE: "Full"
            };
            refund.exchangeData(data);
            expect(refund.validateData).to.not.throw();
        });
        it('Should throw', function () {
            var data = {

                REFUNDTYPE: "Full"
            };
            refund.exchangeData(data);
            expect(refund.validateData).to.throw('TRANSACTIONID: Required parameter for this transaction is undefined');
        });
    });
});

describe('ExecuteRefund', function () {
    it('Should Return ACK Success', function (done) {
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
            COUNTRYCODE: "US",
            METHOD: "Test",
            PAYMENTACTION: "OK"
        };

        try {
            auth.exchangeData(data);
            auth.validateData();

            paypal_classic_sdk.execute(auth.getParameters(), function (err, res) {
                if (err) { done(err); }

                cap.exchangeData({
                    AUTHORIZATIONID: res.response.decoded.TRANSACTIONID,
                    COMPLETETYPE: 'Complete',
                    AMT: auth.getParameters().AMT
                });
                paypal_classic_sdk.execute(cap.getParameters(), function (err, res) {
                    if (err) { done(err); }
                    refund.exchangeData({
                        TRANSACTIONID: res.response.decoded.TRANSACTIONID,
                        REFUNDTYPE: "Full"
                    });
                    paypal_classic_sdk.execute(refund.getParameters(), function (err, res) {
                        if (err) { done(err); }
                        res.response.decoded.ACK.should.equal("Success");
                        done();
                    });
                });
            });

        }
        catch (err)
        {
            console.log(err);
        }
    });
});
