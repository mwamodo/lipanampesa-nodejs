const functions = require('firebase-functions');
const app = require('express')();

const { testPay, mpesaWebhook } = require('./handlers/mpesav1');
const { testPayv2 } = require('./handlers/mpesav2');

// Webhook endpoint to receive webhook from safaricom
app.post('/hooks/mpesa', mpesaWebhook)

// Test Mpesa Pay
app.get('/test-pay', testPay);
app.get('/test-pay-v2', testPayv2)

// baseurl: https://baseurl.com/api/
exports.api = functions.https.onRequest(app);