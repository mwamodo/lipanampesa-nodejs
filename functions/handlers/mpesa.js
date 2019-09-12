const { oAuth, lipaNaMpesaOnline } = require('./endpoints');
const { request } = require('./helpers');

/**
 * Class representing the Mpesa instance
 */

class Mpesa {

  constructor(config = {}){
    if (!config.consumerKey) throw new Error('Consumer Key is Missing')
    if (!config.consumerSecret) throw new Error('Consumer Secret is Missing')
    this.configs = { ...config }
    this.environment = config.environment === 'production' ? 'production' : 'sandbox'
    this.request = request.bind(this)
    // this.security = () => {
    //   return security(this.configs.certPath, this.configs.securityCredential)
    // }
    this.baseURL = `https://${this.environment === 'production' ? 'api' : 'sandbox'}.safaricom.co.ke`
  }

  oAuth() {
    const { consumerKey, consumerSecret } = this.configs
    return oAuth.bind(this)(consumerKey, consumerSecret)
  }

  lipaNaMpesaOnline() {
    return lipaNaMpesaOnline.bind(this)(...arguments)
  }

}

module.exports = Mpesa;