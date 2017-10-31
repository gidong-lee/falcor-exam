const axios = require('axios');

class ProductService {

  constructor(domain) {
    this.serverDomain = domain;
  }

  getProductList(pathSet) {
    const {to, from} = pathSet[1][0];

    return axios.get(`${this.serverDomain}/productList?_start=${from}&_end=${to + 1}`);
  }
}

module.exports = ProductService;