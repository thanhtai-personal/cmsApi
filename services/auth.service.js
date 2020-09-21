const BaseService = require('./base');
const UserModel = require('./../models/user');
const passwordHash = require('password-hash');
const { secretKey, expiresIn } = require('./../middleWares/configAuthen.json');

class AuthService extends BaseService {
  constructor () {
    super();
    this.models = {
      user: UserModel
    }
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.getUserData = this.getUserData.bind(this);
  }

  async register (data) {
    try {
      let user = await this.models.user.findByEmail(data.email)
      if (!user) {
        let user = await this.models.user.createOrUpdate(data)
        return {
          message: 'created user',
          data: user
        }
      } else {
        return {
          message: 'user is existed',
          data: {
            email: user.email
          }
        }
      }
    } catch (error) {
      console.log(`AuthService - register - failed`, error);
      throw (error);
    }
  }

  async login (data) {
    try {
      let user = await this.models.user.findByEmail(data.email);
      if (user) {
        if (passwordHash.verify(user.password, data.password)) {
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

  async getUserData (tokenData) {
    try {
      let user = await models.User.findOne({
        attributes: ['email', 'id'],
        where: { email: tokenData.email, isDelete: false },
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