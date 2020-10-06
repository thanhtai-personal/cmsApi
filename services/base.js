const database = require('./../database');
const { postgresDb } = database;

class BaseService {
  constructor () {
    this.dbContext = postgresDb;
    this.logger = {
      log: (functionName, messageData) => {
        console.log(this.constructor.name.toUpperCase());
        console.log(`${functionName}---`, messageData)
      }
    };
  }
}

module.exports = BaseService