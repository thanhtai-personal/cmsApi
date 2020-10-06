const jwt = require('jsonwebtoken');

const BaseController = require('./base.controller');
const AuthService = require('./../services/auth.service');
const AccountService = require('./../services/baseModelServices/account.service');
const UserService = require('./../services/baseModelServices/user.service');
const ImageService = require('./../services/baseModelServices/image.service');
const RoleService = require('./../services/baseModelServices/role.service');
const roles = require('../constants/roles');
const accountTypes = require('../constants/accountTypes');
const generatorPassword = require('generate-password');
const { customAction } = require('./../constants');

class AuthController extends BaseController {
  constructor () {
    super(new AuthService());
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.getAuthData = this.getAuthData.bind(this);
    this.googleLogin = this.googleLogin.bind(this);
    this.createGuess = this.createGuess.bind(this);
    this.accountService = new AccountService();
    this.userService = new UserService();
    this.imageService = new ImageService();
    this.roleService = new RoleService();
  }

  async login (req, res, next) {
    try {
      let data = req.body;
      let account = await this.accountService.getByEmail(data.email);
      let resultData = await this.service.login(data, account);
      return res.json(this.bindSuccessDataResponse(resultData));
    } catch (error) {
      next(error)
    }
  }

  async createGuess () {
    let role = await this.roleService.getByTitle(roles.guess)
    if (!role) {
      role = await this.roleService.createOrUpdate({
        title: roles.guess,
        description: "guess"
      })
    }
    return role
  }

  async register (req, res, next) {
    try {
      let data = req.body;
      if (!data.passwordHash) data.passwordHash = data.password
      if (!data.userId) {
        let user = await this.userService.createOrUpdate(data);
        data.userId = user.id;
      }
      if (!data.role) {
        data.role = this.createGuess().id;
      }
      if (data.image) {
        let image = this.imageService.createOrUpdate({
          name: "profileImage",
          description: "profile image",
          src: data.image
        })
        data.profileImage = image.id
      }
      let account = await this.accountService.createOrUpdate(data);
      let resultData = await this.service.login({
        email: req.body.email,
        password: req.body.password
      }, account);
      return res.json(this.bindSuccessDataResponse(resultData));
    } catch (error) {
      next(error)
    }
  }

  async getAuthData (req, res, next) {
    try {
      let account = await this.service.getAuthData(req.body)
      if (!account) {
        return res.send({error: createError(404), data: { message: 'no account found'}})
      }
      return res.json(this.bindSuccessDataResponse(account))
    } catch (error) {
      next(error);
    }
  }

  async googleLogin (req, res, next) {
    try {
      let account = await this.service.socialLogin(req.body)
      if (!account) {
        return res.send({error: createError(404), data: { message: 'no account found'}})
      }
      if (account === customAction.next) {
        let data = {
          ...req.body
        }
        if (!data.userId) {
          let user = await this.userService.createOrUpdate(data);
          data.userId = user.id;
        }
        if (!data.role) {
          data.role = this.createGuess().id;
        }
        if (data.image) {
          let image = this.imageService.createOrUpdate({
            name: "profileImage",
            description: "profile image",
            src: data.image
          })
          data.profileImage = image.id
        }
        data.accountType = accountTypes.google
        data.passwordHash = generatorPassword.generate({
          length: 9,
          numbers: true,
          lowercase: true,
          uppercase: true,
          excludeSimilarCharacters: true,
        });
        account = await this.accountService.createOrUpdate(data);
      }
      let resultData = await this.service.login({
        email: req.body.email,
        password: customAction.socialGeneratePassword
      }, account);
      return res.json(this.bindSuccessDataResponse(resultData))
    } catch (error) {
      next(error);
    }
  }

  async facebookLogin (req, res, next) {
    try {
      let account = await this.service.socialLogin(req.body)
      if (!account) {
        return res.send({error: createError(404), data: { message: 'no account found'}})
      }
      if (account === customAction.next) {
        let data = {
          ...req.body
        }
        if (!data.userId) {
          let user = await this.userService.createOrUpdate(data);
          data.userId = user.id;
        }
        if (!data.role) {
          data.role = this.createGuess().id;
        }
        if (data.image) {
          let image = this.imageService.createOrUpdate({
            name: "profileImage",
            description: "profile image",
            src: data.image
          })
          data.profileImage = image.id
        }
        data.accountType = accountTypes.facebook
        data.passwordHash = generatorPassword.generate({
          length: 9,
          numbers: true,
          lowercase: true,
          uppercase: true,
          excludeSimilarCharacters: true,
        });
        account = await this.accountService.createOrUpdate(data);
      }
      let resultData = await this.service.login({
        email: req.body.email,
        password: customAction.socialGeneratePassword
      }, account);
      return res.json(this.bindSuccessDataResponse(resultData))
    } catch (error) {
      next(error);
    }
  }

}

module.exports = AuthController