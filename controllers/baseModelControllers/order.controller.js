const OrderService = require('../../services/baseModelServices/order.service');
const BaseModelController = require('./../base.controller');
class OrderController extends BaseModelController {
  constructor () {
    super(new OrderService());
  }
}

module.exports = OrderController