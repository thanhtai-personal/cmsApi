const BaseService = require('./baseModel.service');
const ProductMetaModel = require('./../../models/product_meta');

class ProductMetaService extends BaseService {
  constructor() {
    super(ProductMetaModel);
  }
}

module.exports = ProductMetaService