const UserService = require('../../services/baseModelServices/user.service');
const BaseController = require('./../base.controller');
class UserController extends BaseController {
  constructor () {
    super(new UserService());
    this.getByEmail = this.getByEmail.bind(this);
  }

  async getByEmail (req, res, next) {
    const { data: { email = '' } } = req;
    try {
      const result = await this.service.getByEmail(email)
      res.send(this.bindSuccessDataResponse(result));
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController