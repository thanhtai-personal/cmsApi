const TransactionService = require('../../services/baseModelServices/transaction.service');
const BaseModelController = require('./../base.controller');
class TransactionController extends BaseModelController {
  constructor () {
    super(new TransactionService());
  }
}

module.exports = TransactionController