const CartService = require('../../services/baseModelServices/cart.service');
const BaseModelController = require('./../base.controller');
class CartController extends BaseModelController {
  constructor () {
    super(new CartService());
  }
}

module.exports = CartController