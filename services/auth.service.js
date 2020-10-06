
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');

const BaseService = require('./base');
const AccountModel = require('./../models/account');
const { secretKey, expiresIn } = require('./../middleWares/configAuthen.json');
const { customAction } = require('./../constants');

class AuthService extends BaseService {
  constructor () {
    super();
    this.models = {
      account: AccountModel
    }
    this.login = this.login.bind(this);
    this.getAuthData = this.getAuthData.bind(this);
    this.logger.log = this.logger.log.bind(this)
  }

  async login (data, account) {
    try {
      if (account) {
        if (passwordHash.verify(data.password, account.passwordHash)
          || data.password === customAction.socialGeneratePassword
        ) {
          let token = jwt.sign({
            email: account.email,
            id: account.id
          }, secretKey, { expiresIn });
          return {
            message: 'Login success!',
            token: token
          }
        } else {
          return {
            message: 'wrong username or password!'
          }
        }
      } else {
        return {
          message: 'wrong username or password!'
        }
      }
    } catch (error) {
      this.logger.log('login', error);
      throw (error);
    }
  }

  async getAuthData (tokenData) {
    try {
      let account = await this.models.account.findOne({
        attributes: ['email', 'id'],
        where: { email: tokenData.email, isDelete: 0 },
        raw: true
      });
      if (account) return account
      else {
        return {
          message: 'account does not exist',
          data: account
        }
      }
    } catch (error) {
      this.logger.log('getAuthData', error)
      throw error
    }
  }

  async socialLogin (profile) {
    try {
      let account = await this.models.account.findOne({
        attributes: ['email', 'id'],
        where: { email: profile.email, isDelete: 0 },
        raw: true
      });
      if (account) return account
      else {
        return customAction.next
      }
    } catch (error) {
      this.logger.log('socialLogin', error)
      throw error
    }
  }
  
}

module.exports = AuthService