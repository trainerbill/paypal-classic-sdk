"use strict";

var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

var paypal_classic_sdk = require('../../../');
require('../../configure');

var setec = paypal_classic_sdk.getModel("setexpresscheckout");

describe('SetExpressCheckoutModel', function () {
    describe('Construction', function () {
        it('should return an object with the correct properties', function () {

            //Check parameters
            setec.getParameters().should.be.a('object');

            //Check default parameters
            setec.getDefaultParameters().should.be.a('object');
            setec.getDefaultParameters().should.have.property('METHOD');
            setec.getDefaultParameters().METHOD.should.equal("SetExpressCheckout");

            //Check validation parameters
            setec.getValidationParameters().should.be.a('array');
            setec.getValidationParameters().should.have.length(5);

        });
    });
    describe('exchangeData', function () {
        it('should populate the object parameters variable', function () {

            var data = {
                PAYMENTREQUEST_0_PAYMENTACTION: "Sale",
                PAYMENTREQUEST_0_CURRENCYCODE: "USD",
                RETURNURL: "http://localhost",
                CANCELURL: "http://localhost",
                PAYMENTREQUEST_0_AMT: "100.00"

            };


            setec.exchangeData(data);
            var params = setec.getParameters();
            params.should.have.property('PAYMENTREQUEST_0_PAYMENTACTION');
            params.should.have.property('PAYMENTREQUEST_0_CURRENCYCODE');
            params.should.have.property('RETURNURL');
            params.should.have.property('CANCELURL');
            params.should.have.property('PAYMENTREQUEST_0_AMT');
            //Method should be overridden by the model defaults
            params.METHOD.should.equal("SetExpressCheckout");
            params.PAYMENTREQUEST_0_PAYMENTACTION.should.equal("Sale");
            params.PAYMENTREQUEST_0_CURRENCYCODE.should.equal("USD");
            params.RETURNURL.should.equal("http://localhost");
            params.CANCELURL.should.equal("http://localhost");
            params.PAYMENTREQUEST_0_AMT.should.equal("100.00");
        });
    });

    describe('validateData', function () {
        it('Should not throw', function () {
            var data = {
                PAYMENTREQUEST_0_PAYMENTACTION: "Sale",
                PAYMENTREQUEST_0_CURRENCYCODE: "USD",
                RETURNURL: "http://localhost",
                CANCELURL: "http://localhost",
                PAYMENTREQUEST_0_AMT: "100.00"

            };
            setec.exchangeData(data);
            expect(setec.validateData).to.not.throw();
        });
        it('Should throw', function () {
            var data = {
                PAYMENTREQUEST_0_PAYMENTACTION: "Sale",
                PAYMENTREQUEST_0_CURRENCYCODE: "USD",
                RETURNURL: "http://localhost",
                CANCELURL: "http://localhost"
            };
            setec.exchangeData(data);
            expect(setec.validateData).to.throw('PAYMENTREQUEST_0_AMT: Required parameter for this transaction is undefined');
        });
    });
});

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
