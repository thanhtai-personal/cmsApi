
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');

const BaseService = require('./base');
const UserModel = require('./../models/user');
const { secretKey, expiresIn } = require('./../middleWares/configAuthen.json');

class AuthService extends BaseService {
  constructor () {
    super();
    this.models = {
      user: UserModel
    }
    this.login = this.login.bind(this);
    this.getAuthData = this.getAuthData.bind(this);
  }

  async login (data, user) {
    try {
      if (user) {
        if (passwordHash.verify(data.password, user.passwordHash)) {
          let token = jwt.sign({
            email: user.email,
            id: user.id
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
      console.log(`AuthService - login - failed`, error);
      throw (error);
    }
  }

  async getAuthData (tokenData) {
    try {
      let user = await this.models.user.findOne({
        attributes: ['email', 'id'],
        where: { email: tokenData.email, isDelete: 0 },
        raw: true
      });
      if (user) return user
      else {
        return {
          message: 'user does not exist',
          data: user
        }
      }
    } catch (error) {
      console.log('AuthService - getUserData - failed', error)
      throw error
    }
  }
  
}

module.exports = AuthService