const Mpesa = require('./mpesa');

const MpesaApi = new Mpesa(
  {
    consumerKey: '6YNv1oZB4r8LaFnfwjeZXtOOcuDaAkzQ',
    consumerSecret: 'FSGnYDnDq4AWbaWX',
    environment: 'sandbox',
    shortCode: '174379',
    lipaNaMpesaShortCode: '174379',
    lipaNaMpesaShortPass: 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'
  })

exports.testPayv2 =(req, res) => {
  const senderMsisdn = 254705287169
  const amount = 1
  const callbackUrl = "https://us-central1-mpesa-functions.cloudfunctions.net/api/hooks/mpesa";
  const accountRef = Math.random().toString(35).substr(2, 7)

  MpesaApi
    .lipaNaMpesaOnline(senderMsisdn, amount, callbackUrl, accountRef)
    .then(res => console.log(res))
    .catch(err => console.error(err))
}