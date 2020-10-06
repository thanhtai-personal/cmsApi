const BaseService = require('./baseModel.service');
const AccountModel = require('./../../models/account');

class AccountService extends BaseService {
  constructor() {
    super(AccountModel);
    this.getByEmail = this.getByEmail.bind(this);
    this.logger.log = this.logger.log.bind(this)
  }

  async getByEmail (email) {
    if (!this.model) return null;
    try {
      const result = await this.model.findOne({
        where: {
          email
        }
      });
      if (!result) {
        this.logger.log('getByEmail', 'not found by the email');
        return null;
      }
      return result;
    } catch (error) {
      this.logger.log('getByEmail', error);
      return null;
    }
  }

}

module.exports = AccountService