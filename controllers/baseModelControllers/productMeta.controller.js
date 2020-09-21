const ProductMetaService = require('../../services/baseModelServices/productMeta.service');
const BaseModelController = require('./../base.controller');
class ProductMetaController extends BaseModelController {
  constructor () {
    super(new ProductMetaService());
  }
}

module.exports = ProductMetaController