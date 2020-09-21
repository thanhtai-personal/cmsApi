const TransactionService = require('../../services/baseModelServices/transaction.service');
const BaseController = require('./../base.controller');
class TransactionController extends BaseController {
  constructor () {
    super(new TransactionService());
  }
}

module.exports = TransactionController