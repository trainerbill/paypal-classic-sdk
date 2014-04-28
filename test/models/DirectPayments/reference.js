"use strict";

var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

var paypal_classic_sdk = require('../../../');
require('../../configure');

var ref = paypal_classic_sdk.getModel("reference");
var auth = paypal_classic_sdk.getModel("authorization");

describe('ReferenceModel', function () {
    describe('Construction', function () {
        it('should return an object with the correct properties', function () {

            //Check parameters
            ref.getParameters().should.be.a('object');

            //Check default parameters
            ref.getDefaultParameters().should.be.a('object');
            ref.getDefaultParameters().should.have.property('METHOD');
            ref.getDefaultParameters().METHOD.should.equal("DoReferenceTransaction");

            //Check validation parameters
            ref.getValidationParameters().should.be.a('array');
            ref.getValidationParameters().should.have.length(3);

        });
    });
    describe('exchangeData', function () {
        it('should populate the object parameters variable', function () {

            var data = {
                REFERENCEID: "TestID",
                PAYMENTACTION: "Sale",
                AMT: "100",
                METHOD: "TEST"
            };


            ref.exchangeData(data);
            var params = ref.getParameters();
            params.should.have.property('REFERENCEID');
            params.should.have.property('PAYMENTACTION');
            params.should.have.property('AMT');
            params.should.have.property('METHOD');
            params.REFERENCEID.should.equal("TestID");
            params.PAYMENTACTION.should.equal("Sale");
            params.AMT.should.equal("100");
            params.METHOD.should.equal("DoReferenceTransaction");


        });
    });

    describe('validateData', function () {
        it('Should not throw', function () {
            var data = {
                REFERENCEID: "TestID",
                PAYMENTACTION: "Sale",
                AMT: "100",
            };
            ref.exchangeData(data);
            expect(ref.validateData).to.not.throw();
        });
        it('Should throw', function () {
            var data = {
                REFERENCEID: "TestID",
                PAYMENTACTION: "Sale"
            };
            ref.exchangeData(data);
            expect(ref.validateData).to.throw('AMT: Required parameter for this transaction is undefined');
        });
    });
});

describe('ExecuteReferenceTransaction', function () {
    it('Should Return Ack Success', function (done) {
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

                ref.exchangeData({
                    REFERENCEID: res.response.decoded.TRANSACTIONID,
                    AMT: auth.getParameters().AMT,
                    PAYMENTACTION: "Sale"

                });
                ref.validateData();
                paypal_classic_sdk.execute(ref.getParameters(), function (err, res) {
                    if (err) { done(err); }
                    res.response.decoded.ACK.should.equal("Success");
                    done();
                });
            });

        }
        catch (err)
        {
            console.log(err);
        }
    });
});
