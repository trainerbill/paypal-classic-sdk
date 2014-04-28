"use strict";

var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

var paypal_classic_sdk = require('../../../');
require('../../configure');

var getec = paypal_classic_sdk.getModel("getexpresscheckout");

describe('GetExpressCheckoutModel', function () {
    describe('Construction', function () {
        it('should return an object with the correct properties', function () {

            //Check parameters
            getec.getParameters().should.be.a('object');

            //Check default parameters
            getec.getDefaultParameters().should.be.a('object');
            getec.getDefaultParameters().should.have.property('METHOD');
            getec.getDefaultParameters().METHOD.should.equal("GetExpressCheckoutDetails");

            //Check validation parameters
            getec.getValidationParameters().should.be.a('array');
            getec.getValidationParameters().should.have.length(1);

        });
    });
    describe('exchangeData', function () {
        it('should populate the object parameters variable', function () {

            var data = {
                TOKEN: "TestToken",
                METHOD: "Test"
            };


            getec.exchangeData(data);
            var params = getec.getParameters();
            params.should.have.property('TOKEN');

            //Method should be overridden by the model defaults
            params.METHOD.should.equal("GetExpressCheckoutDetails");
            params.TOKEN.should.equal("TestToken");

        });
    });

    describe('validateData', function () {
        it('Should not throw', function () {
            var data = {
                TOKEN: "TestToken"
            };
            getec.exchangeData(data);
            expect(getec.validateData).to.not.throw();
        });
        it('Should throw', function () {
            var data = {

            };
            getec.exchangeData(data);
            expect(getec.validateData).to.throw('TOKEN: Required parameter for this transaction is undefined');
        });
    });
});
/*
describe('ExecuteSetExpressCheckout', function () {
    it('Should Return ACK Success', function (done) {
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
                if (err) { done(err); }
                res.response.decoded.ACK.should.equal("Success");
                done();
            });

        }
        catch (err)
        {
            console.log(err);
        }
    });
});
*/
