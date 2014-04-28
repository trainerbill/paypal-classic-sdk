"use strict";

var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

var paypal_classic_sdk = require('../../../');
require('../../configure');

var auth = paypal_classic_sdk.getModel("authorization");

describe('AuthorizationModel', function () {
    describe('Construction', function () {
        it('should return an object with the correct properties', function () {

            //Check parameters
            auth.getParameters().should.be.a('object');

            //Check default parameters
            auth.getDefaultParameters().should.be.a('object');
            auth.getDefaultParameters().should.have.property('METHOD');
            auth.getDefaultParameters().METHOD.should.equal("DoDirectPayment");
            auth.getDefaultParameters().should.have.property('PAYMENTACTION');
            auth.getDefaultParameters().PAYMENTACTION.should.equal("Authorization");

            //Check validation parameters
            auth.getValidationParameters().should.be.a('array');
            auth.getValidationParameters().should.have.length(13);

        });
    });
    describe('exchangeData', function () {
        it('should populate the object parameters variable', function () {

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


            auth.exchangeData(data);
            var params = auth.getParameters();
            params.should.have.property('METHOD');
            params.should.have.property('PAYMENTACTION');
            params.should.have.property('ACCT');
            params.should.have.property('EXPDATE');
            //TRXTYPE and TENDER should be overridden by the model defaults
            params.METHOD.should.equal("DoDirectPayment");
            params.PAYMENTACTION.should.equal("Authorization");
            params.AMT.should.equal("100");
            params.EXPDATE.should.equal("112018");


        });
    });

    describe('validateData', function () {
        it('Should not throw', function () {
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
            auth.exchangeData(data);
            expect(auth.validateData).to.not.throw();
        });
        it('Should throw', function () {
            var data = {
                ACCT: "4716792779006088",
                EXPDATE: "1118",
                CVV2: "111"
            };
            auth.exchangeData(data);
            expect(auth.validateData).to.throw('AMT: Required parameter for this transaction is undefined');
        });
    });
});

describe('ExecuteAuthorization', function () {
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
            COUNTRYCODE: "US"
        };

        try {
            auth.exchangeData(data);
            auth.validateData();

            paypal_classic_sdk.execute(auth.getParameters(), function (err, res) {
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
