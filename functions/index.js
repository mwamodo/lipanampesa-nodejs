const functions = require('firebase-functions');
const app = require('express')();

const { testPay, mpesaWebhook } = require('./handlers/mpesa');

// Webhook endpoint to receive webhook from safaricom
app.post('/hooks/mpesa', mpesaWebhook)

// Test Mpesa Pay
app.get('/test-pay', testPay);

// baseurl: https://baseurl.com/api/
exports.api = functions.https.onRequest(app);