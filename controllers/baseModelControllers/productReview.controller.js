const ProductReviewService = require('../../services/baseModelServices/productReview.service');
const BaseModelController = require('./../base.controller');
class ProductReviewController extends BaseModelController {
  constructor () {
    super(new ProductReviewService());
  }
}

module.exports = ProductReviewController