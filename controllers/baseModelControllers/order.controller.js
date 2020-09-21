const OrderService = require('../../services/baseModelServices/order.service');
const BaseController = require('./../base.controller');
class OrderController extends BaseController {
  constructor () {
    super(new OrderService());
  }
}

module.exports = OrderController