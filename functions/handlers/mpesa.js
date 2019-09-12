/* eslint-disable promise/no-nesting */
const axios = require('axios');

exports.mpesaWebhook = (req, res) => {
  console.log(`---- Received M-Pesa webhook----`);

  // dump the request payload received from safaricom in the terminal
  console.log(req.body);
  console.log("-------------------");
  let message = {
    ResponseCode: "00000000",
    ResponseDesc: "success"
  };

  // respond to safaricom servers with a success message
  res.json(message);
}

const config = {
  key: "6YNv1oZB4r8LaFnfwjeZXtOOcuDaAkzQ",
  secret: "FSGnYDnDq4AWbaWX",
  baseURL: `https://sandbox.safaricom.co.ke`,
  passkey: "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919",
  BusinessShortCode: "174379",
  PartyB: "174379",
  Amount: "1",
  PhoneNumber: "254707131702",
  CallBackURL: "https://us-central1-mpesa-functions.cloudfunctions.net/api/hooks/mpesa",
  AccountReference: "Test",
  TransactionDesc: "Test"
};

exports.testPay = (req, res) => {
  let _timestamp = new Date()
    .toISOString()
    .replace(/[^0-9]/g, "")
    .slice(0, -3);

  // 1. Get Token
  const auth = Buffer.from(`${config.key}:${config.secret}`).toString("base64");

  axios.get(`${config.baseURL}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: {
      Authorization: `Basic ${auth}`,
      "content-type": "application/json"
    }
  })
  .then(data => {
    // extract token from data
    let token = data.data.access_token;

    // use token to request payment
    axios.post(
      `${config.baseURL}/mpesa/stkpush/v1/processrequest`,
      {
        // Use dynamic Values: Amount and PhoneNumber Should Come From Request
        // TransactionType is "CustomerBuyGoodsOnline" for till and "CustomerPayBillOnline" for paybill
        // BusinessShortCode is the Head Office Number
        // Till or Paybill is PartyB
        BusinessShortCode: config.BusinessShortCode,
        Password: Buffer.from(
          `${config.BusinessShortCode}${config.passkey}${_timestamp}`
        ).toString("base64"),
        Timestamp: _timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: config.Amount,
        PartyA: config.PhoneNumber,
        PartyB: config.PartyB,
        PhoneNumber: config.PhoneNumber,
        CallBackURL: config.CallBackURL,
        AccountReference: config.AccountReference,
        TransactionDesc: config.AccountReference
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json"
        }
      }
    )
    .then(res => console.log(res))
    .catch( err => console.err(err))
  return token;
  })
  .catch(err => console.log(err))
}