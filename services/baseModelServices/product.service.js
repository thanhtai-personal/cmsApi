const BaseService = require('./../base');
const ProductModel = require('./../../models/product');

class ProductService extends BaseService {
  constructor() {
    super(ProductModel);
  }
}

module.exports = ProductService