"use strict";

var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

var paypal_classic_sdk = require('../../../');
require('../../configure');

var doec = paypal_classic_sdk.getModel("doexpresscheckout");

describe('DoExpressCheckoutModel', function () {
    describe('Construction', function () {
        it('should return an object with the correct properties', function () {

            //Check parameters
            doec.getParameters().should.be.a('object');

            //Check default parameters
            doec.getDefaultParameters().should.be.a('object');
            doec.getDefaultParameters().should.have.property('METHOD');
            doec.getDefaultParameters().METHOD.should.equal("DoExpressCheckoutPayment");

            //Check validation parameters
            doec.getValidationParameters().should.be.a('array');
            doec.getValidationParameters().should.have.length(3);

        });
    });
    describe('exchangeData', function () {
        it('should populate the object parameters variable', function () {

            var data = {
                TOKEN: "TestToken",
                PAYERID: "TestPayer",
                PAYMENTREQUEST_0_AMT: "100.00",
                METHOD: "Test"
            };


            doec.exchangeData(data);
            var params = doec.getParameters();
            params.should.have.property('TOKEN');
            params.should.have.property('PAYERID');
            params.should.have.property('PAYMENTREQUEST_0_AMT');
            params.should.have.property('METHOD');

            //Method should be overridden by the model defaults
            params.METHOD.should.equal("DoExpressCheckoutPayment");
            params.TOKEN.should.equal("TestToken");
            params.PAYERID.should.equal("TestPayer");
            params.PAYMENTREQUEST_0_AMT.should.equal("100.00");


        });
    });

    describe('validateData', function () {
        it('Should not throw', function () {
            var data = {
                TOKEN: "TestToken",
                PAYERID: "TestPayer",
                PAYMENTREQUEST_0_AMT: "100.00"
            };
            doec.exchangeData(data);
            expect(doec.validateData).to.not.throw();
        });
        it('Should throw', function () {
            var data = {
                TOKEN: "TestToken",
                PAYERID: "TestPayer"
            };
            doec.exchangeData(data);
            expect(doec.validateData).to.throw('PAYMENTREQUEST_0_AMT: Required parameter for this transaction is undefined');
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
