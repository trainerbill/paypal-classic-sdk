"use strict";

var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

var paypal_classic_sdk = require('../../../');
require('../../configure');

var cap = paypal_classic_sdk.getModel("capture");
var auth = paypal_classic_sdk.getModel("authorization");

describe('CaptureModel', function () {
    describe('Construction', function () {
        it('should return an object with the correct properties', function () {

            //Check parameters
            cap.getParameters().should.be.a('object');

            //Check default parameters
            cap.getDefaultParameters().should.be.a('object');
            cap.getDefaultParameters().should.have.property('METHOD');
            cap.getDefaultParameters().METHOD.should.equal("DoCapture");

            //Check validation parameters
            cap.getValidationParameters().should.be.a('array');
            cap.getValidationParameters().should.have.length(3);

        });
    });
    describe('exchangeData', function () {
        it('should populate the object parameters variable', function () {

            var data = {
                AUTHORIZATIONID: "TestID",
                COMPLETETYPE: "Complete",
                AMT: "100",
                METHOD: "TEST"
            };


            cap.exchangeData(data);
            var params = cap.getParameters();
            params.should.have.property('AUTHORIZATIONID');
            params.should.have.property('COMPLETETYPE');
            params.should.have.property('AMT');
            params.should.have.property('METHOD');
            //TRXTYPE and TENDER should be overridden by the model defaults
            params.AUTHORIZATIONID.should.equal("TestID");
            params.COMPLETETYPE.should.equal("Complete");
            params.AMT.should.equal("100");
            params.METHOD.should.equal("DoCapture");


        });
    });

    describe('validateData', function () {
        it('Should not throw', function () {
            var data = {
                AUTHORIZATIONID: "TestID",
                COMPLETETYPE: "Complete",
                AMT: "100"
            };
            cap.exchangeData(data);
            expect(cap.validateData).to.not.throw();
        });
        it('Should throw', function () {
            var data = {
                AUTHORIZATIONID: "TestID",
                AMT: "100"
            };
            cap.exchangeData(data);
            expect(cap.validateData).to.throw('COMPLETETYPE: Required parameter for this transaction is undefined');
        });
    });
});

describe('ExecuteCapture', function () {
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

                cap.exchangeData({
                    AUTHORIZATIONID: res.response.decoded.TRANSACTIONID,
                    COMPLETETYPE: "Complete",
                    AMT: auth.getParameters().AMT
                });
                paypal_classic_sdk.execute(cap.getParameters(), function (err, res) {
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
