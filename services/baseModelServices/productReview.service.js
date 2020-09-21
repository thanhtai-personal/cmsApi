const BaseService = require('./baseModel.service');
const ProductReviewModel = require('./../../models/product_review');

class ProductReviewService extends BaseService {
  constructor() {
    super(ProductReviewModel);
  }
}

module.exports = ProductReviewService