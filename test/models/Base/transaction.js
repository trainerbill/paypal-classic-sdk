"use strict";

var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

var paypal_classic_sdk = require('../../../');
require('../../configure');

var trx = require('../../../models/Base/transaction')();

describe('TransactionModel', function () {

    describe('Construction', function () {
        it('should return an object with the correct properties', function () {

            trx.should.have.property('getParameters');
            trx.should.have.property('getDefaultParameters');
            trx.should.have.property('getValidationParameters');
            trx.should.have.property('setDefaultParameters');
            trx.should.have.property('setValidationParameters');
            trx.should.have.property('exchangeData');
            trx.should.have.property('validateData');


            //Check parameters
            trx.getParameters().should.be.a('object');

            //Check default parameters
            trx.getDefaultParameters().should.be.a('object');

            //Check validation parameters
            trx.getValidationParameters().should.be.a('array');

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
                COUNTRYCODE: "US"
            };

            trx.exchangeData(data);

            var params = trx.getParameters();
            params.should.have.property('ACCT');
            params.should.have.property('EXPDATE');
            params.should.have.property('CVV2');
            params.should.have.property('AMT');

            params.ACCT.should.equal("4716792779006088");
            params.EXPDATE.should.equal("112018");
            params.CVV2.should.equal("111");
            params.AMT.should.equal("100");


        });
    });
    describe('getParameters', function () {
        it('should return an object', function () {
            trx.getParameters().should.be.a('object');
        });
    });
    describe('getDefaultParameters', function () {
        it('should return an object', function () {
            trx.getDefaultParameters().should.be.a('object');
        });
    });

    describe('getValidationParameters', function () {
        it('should return an array', function () {
            trx.getValidationParameters().should.be.a('array');
        });
    });


});