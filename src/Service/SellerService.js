const axios = require('axios');


class SellerService {

  constructor(domain) {
    this.serverDomain = domain;
  }

  getSeller(id) {
    return axios.get(`${this.serverDomain}/sellerList/${id}`);
  }
}

module.exports = SellerService;