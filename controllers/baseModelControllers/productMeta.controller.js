const ProductMetaService = require('../../services/baseModelServices/productMeta.service');
const BaseController = require('./../base.controller');
class ProductMetaController extends BaseController {
  constructor () {
    super(new ProductMetaService());
  }
}

module.exports = ProductMetaController