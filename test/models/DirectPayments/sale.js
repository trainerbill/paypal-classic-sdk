"use strict";

var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

var paypal_classic_sdk = require('../../../');
require('../../configure');

var sale = paypal_classic_sdk.getModel("sale");

describe('SaleModel', function () {
    describe('Construction', function () {
        it('should return an object with the correct properties', function () {

            //Check parameters
            sale.getParameters().should.be.a('object');

            //Check default parameters
            sale.getDefaultParameters().should.be.a('object');
            sale.getDefaultParameters().should.have.property('METHOD');
            sale.getDefaultParameters().METHOD.should.equal("DoDirectPayment");


            //Check validation parameters
            sale.getValidationParameters().should.be.a('array');
            sale.getValidationParameters().should.have.length(13);

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


            sale.exchangeData(data);
            var params = sale.getParameters();
            params.should.have.property('METHOD');
            params.should.have.property('PAYMENTACTION');
            params.should.have.property('ACCT');
            params.should.have.property('EXPDATE');
            //TRXTYPE and TENDER should be overridden by the model defaults
            params.METHOD.should.equal("DoDirectPayment");
            params.PAYMENTACTION.should.equal("Sale");
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
            sale.exchangeData(data);
            expect(sale.validateData).to.not.throw();
        });
        it('Should throw', function () {
            var data = {
                ACCT: "4716792779006088",
                EXPDATE: "112018",
                CVV2: "111",
                IPADDRESS: "127.0.0.1",
                FIRSTNAME: "Fred",
                LASTNAME: "Flintstone",
                STREET: "123 Bedrock",
                CITY: "Omaha",
                STATE: "NE",
                ZIP: "68136",
                COUNTRYCODE: "US"
            };
            sale.exchangeData(data);
            expect(sale.validateData).to.throw('AMT: Required parameter for this transaction is undefined');
        });
    });
});

describe('ExecuteSale', function () {
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
            sale.exchangeData(data);
            sale.validateData();

            paypal_classic_sdk.execute(sale.getParameters(), function (err, res) {
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
