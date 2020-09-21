const BaseService = require('./../base');
const UserModel = require('./../../models/user');

class UserService extends BaseService {
  constructor() {
    super(UserModel);
    this.getByEmail = this.getByEmail.bind(this);
  }

  async getByEmail (email) {
    if (!this.model) return null;
    try {
      const result = await this.model.findOne({
        email
      });
      if (!result) {
        console.log('user not found by the email');
        return null;
      }
      return result;
    } catch (error) {
      console.log('user not found by the email', error);
      return null;
    }
  }

}

module.exports = UserService