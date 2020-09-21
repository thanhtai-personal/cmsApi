const CartService = require('../../services/baseModelServices/cart.service');
const BaseController = require('./../base.controller');
class CartController extends BaseController {
  constructor () {
    super(new CartService());
  }
}

module.exports = CartController