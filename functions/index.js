const functions = require('firebase-functions');
const app = require('express')();

// Test Mpesa Pay
app.get('/test-pay', (req, res) => {
  return res.json({});
});

// baseurl: https://baseurl.com/api/
exports.api = functions.https.onRequest(app);