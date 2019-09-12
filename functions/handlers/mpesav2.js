const Mpesa = require('./mpesa');
const MpesaAPi = new Mpesa(
  {
    consumerKey: '6YNv1oZB4r8LaFnfwjeZXtOOcuDaAkzQ',
    consumerSecret: 'FSGnYDnDq4AWbaWX'
  })

exports.testPayv2 =(req, res) => {
  return res.json({});
}