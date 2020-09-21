const BaseService = require('./baseModel.service');
const ProductModel = require('./../../models/product');

class ProductService extends BaseService {
  constructor() {
    super(ProductModel);
  }
}

module.exports = ProductService