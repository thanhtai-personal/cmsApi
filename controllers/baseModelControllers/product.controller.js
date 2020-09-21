const ProductService = require('../../services/baseModelServices/product.service');
const BaseController = require('./../base.controller');
class ProductController extends BaseController {
  constructor () {
    super(new ProductService());
  }
}

module.exports = ProductController