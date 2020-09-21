const CartItemService = require('../../services/baseModelServices/cartItem.service');
const BaseModelController = require('./../base.controller');
class CartItemController extends BaseModelController {
  constructor () {
    super(new CartItemService());
  }
}

module.exports = CartItemController