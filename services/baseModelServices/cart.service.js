const BaseService = require('./../base');
const CartModel = require('./../../models/cart');

class CartService extends BaseService {
  constructor() {
    super(CartModel);
  }
}

module.exports = CartService