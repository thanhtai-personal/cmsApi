const BaseController = require('./base.controller');
const AuthService = require('./../services/auth.service');
const { secretKey } = require('./../middleWares/configAuthen.json');

class AuthController extends BaseController {
  constructor () {
    super(new AuthService());
  }

  async login (req, res, next) {
    try {
      let resultData = await this.service.login(req.body);
      return res.json(resultData);
    } catch (error) {
      next(error)
    }
  }

  async register (req, res, next) {
    try {
      let resultData = await authService.register(req.body);
      return res.json(resultData);
    } catch (error) {
      next(error)
    }
  }

  async getUserData (req, res, next) {
    try {
      let decodedTokenData = jwt.verify(req.headers['x-access-token'], secretKey);
      let user = await authService.getUserData(decodedTokenData)
      if (_.isNil(user)) {
        return res.send({error: createError(404), data: { message: 'no user found'}})
      }
      return res.json(user)
    } catch (error) {
      next(error);
    }
  }

}

module.exports = AuthController