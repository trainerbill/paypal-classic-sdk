"use strict";

var paypal_classic_sdk = require('../');

paypal_classic_sdk.configure({
    host: "api-3t.sandbox.paypal.com",
    path: "/nvp",
    port: "443",
    credentials: {
        USER: "seller_api1.awesome.com",
        PWD: "1374512372",
        SIGNATURE: "Aj1PRxuNKRh0FhwjgrTLGnn515trAGwGZHW7KLOlOuyQom-IEXlq.w4w"

    },
    timeout: 30000,
    paypal_api_version: "109.0"
});