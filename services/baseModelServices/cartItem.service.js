const BaseService = require('./baseModel.service');
const CartItemModel = require('./../../models/cart_item');

class CartItemService extends BaseService {
  constructor() {
    super(CartItemModel);
  }
}

module.exports = CartItemService