"use strict";

var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

var paypal_classic_sdk = require('../../../');
require('../../configure');

var auth = paypal_classic_sdk.getModel("authorization");
var voidtrx = paypal_classic_sdk.getModel("void");

describe('VoidModel', function () {
    describe('Construction', function () {
        it('should return an object with the correct properties', function () {

            //Check parameters
            voidtrx.getParameters().should.be.a('object');

            //Check default parameters
            voidtrx.getDefaultParameters().should.be.a('object');
            voidtrx.getDefaultParameters().should.have.property('METHOD');
            voidtrx.getDefaultParameters().METHOD.should.equal("DoVoid");


            //Check validation parameters
            voidtrx.getValidationParameters().should.be.a('array');
            voidtrx.getValidationParameters().should.have.length(1);

        });
    });
    describe('exchangeData', function () {
        it('should populate the object parameters variable', function () {

            var data = {
                AUTHORIZATIONID: "TestID",
                METHOD: "TEST"
            };
            voidtrx.exchangeData(data);
            var params = voidtrx.getParameters();
            params.should.have.property('METHOD');
            params.should.have.property('AUTHORIZATIONID');

            //METHOD should be overridden by the model defaults
            params.METHOD.should.equal("DoVoid");
            params.AUTHORIZATIONID.should.equal("TestID");
        });
    });

    describe('validateData', function () {
        it('Should not throw', function () {
            var data = {
                AUTHORIZATIONID: "asdfasdfasdf"

            };
            voidtrx.exchangeData(data);
            expect(voidtrx.validateData).to.not.throw();
        });
        it('Should throw', function () {
            var data = {

            };
            voidtrx.exchangeData(data);
            expect(voidtrx.validateData).to.throw('AUTHORIZATIONID: Required parameter for this transaction is undefined');
        });
    });
});

describe('ExecuteVoid', function () {
    it('Should Return Result 0', function (done) {
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

                voidtrx.exchangeData({
                    AUTHORIZATIONID: res.response.decoded.TRANSACTIONID
                });
                paypal_classic_sdk.execute(voidtrx.getParameters(), function (err, res) {
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
