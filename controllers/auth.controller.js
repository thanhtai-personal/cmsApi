const jwt = require('jsonwebtoken');

const BaseController = require('./base.controller');
const AuthService = require('./../services/auth.service');
const UserService = require('./../services/baseModelServices/user.service');
const { secretKey } = require('./../middleWares/configAuthen.json');
const { customAction } = require('./../constants');

class AuthController extends BaseController {
  constructor () {
    super(new AuthService());
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.getAuthData = this.getAuthData.bind(this);
    this.googleLogin = this.googleLogin.bind(this);
    this.userService = new UserService();
  }

  async login (req, res, next) {
    try {
      let data = req.body;
      let user = await this.userService.getByEmail(data.email);
      let resultData = await this.service.login(data, user);
      return res.json(this.bindSuccessDataResponse(resultData));
    } catch (error) {
      next(error)
    }
  }

  async register (req, res, next) {
    try {
      let data = req.body;
      if (!data.passwordHash) data.passwordHash = data.password
      let user = await this.userService.createOrUpdate(data);
      let resultData = await this.service.login({
        email: req.body.email,
        password: req.body.password
      }, user);
      return res.json(this.bindSuccessDataResponse(resultData));
    } catch (error) {
      next(error)
    }
  }

  async getAuthData (req, res, next) {
    try {
      let user = await this.service.getAuthData(req.body)
      if (!user) {
        return res.send({error: createError(404), data: { message: 'no user found'}})
      }
      return res.json(this.bindSuccessDataResponse(user))
    } catch (error) {
      next(error);
    }
  }

  async googleLogin (req, res, next) {
    try {
      let user = await this.service.googleLogin(req.body)
      if (!user) {
        return res.send({error: createError(404), data: { message: 'no user found'}})
      }
      if (user === customAction.next) {
        let data = {
          ...req.body
        }
        user = await this.userService.createOrUpdate(data);
      }
      let resultData = await this.service.login({
        email: req.body.email,
        password: customAction.googleGeneratePassword
      }, user);
      return res.json(this.bindSuccessDataResponse(resultData))
    } catch (error) {
      next(error);
    }
  }

}

module.exports = AuthController