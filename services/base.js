const database = require('./../database');
const { postgresDb } = database;

class BaseService {
  constructor () {
    this.dbContext = postgresDb;
  }
}

module.exports = BaseService