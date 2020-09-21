const ProductService = require('../../services/baseModelServices/product.service');
const BaseModelController = require('./../base.controller');
class ProductController extends BaseModelController {
  constructor () {
    super(new ProductService());
  }
}

module.exports = ProductController