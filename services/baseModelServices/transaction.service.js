const BaseService = require('./../base');
const TransactionModel = require('./../../models/transaction');

class TransactionService extends BaseService {
  constructor() {
    super(TransactionModel);
  }
}

module.exports = TransactionService