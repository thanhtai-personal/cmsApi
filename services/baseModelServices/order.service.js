const BaseService = require('./baseModel.service');
const OrderModel = require('./../../models/order');

class OrderService extends BaseService {
  constructor() {
    super(OrderModel);
  }
}

module.exports = OrderService