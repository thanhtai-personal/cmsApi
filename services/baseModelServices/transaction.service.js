const BaseService = require('./baseModel.service');
const TransactionModel = require('./../../models/transaction');

class TransactionService extends BaseService {
  constructor() {
    super(TransactionModel);
  }
}

module.exports = TransactionService