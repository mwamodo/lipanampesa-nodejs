const Mpesa = require('./mpesa');

// New Instance. You can define more than once instance.
const MpesaAPi = new Mpesa(
  {
    consumerKey: '6YNv1oZB4r8LaFnfwjeZXtOOcuDaAkzQ',
    consumerSecret: 'FSGnYDnDq4AWbaWX',
    environment: 'sandbox',
    shortCode: '174379',
    lipaNaMpesaShortCode: '174379',
    lipaNaMpesaShortPass: 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'
  })

exports.testPayv2 =(req, res) => {
  const senderMsisdn = 254707131702
  amount = 1
  const callbackUrl = "https://us-central1-mpesa-functions.cloudfunctions.net/api/hooks/mpesa";
  const accountRef = Math.random().toString(35).substr(2, 7)

  MpesaAPi
    .lipaNaMpesaOnline(senderMsisdn, amount, callbackUrl, accountRef)
    .then(res => console.log(res))
    .catch(err => console.error(err))
}