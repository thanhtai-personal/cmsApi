const ProductReviewService = require('../../services/baseModelServices/productReview.service');
const BaseController = require('./../base.controller');
class ProductReviewController extends BaseController {
  constructor () {
    super(new ProductReviewService());
  }
}

module.exports = ProductReviewController