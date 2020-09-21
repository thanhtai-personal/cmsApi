const CartItemService = require('../../services/baseModelServices/cartItem.service');
const BaseController = require('./../base.controller');
class CartItemController extends BaseController {
  constructor () {
    super(new CartItemService());
  }
}

module.exports = CartItemController