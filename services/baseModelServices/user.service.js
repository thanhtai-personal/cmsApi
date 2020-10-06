const BaseService = require('./baseModel.service');
const UserModel = require('./../../models/user');

class UserService extends BaseService {
  constructor() {
    super(UserModel);
    this.logger.log = this.logger.log.bind(this);
  }
}

module.exports = UserService