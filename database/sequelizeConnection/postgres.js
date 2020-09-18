const { Sequelize } = require('sequelize');
const config = require('./config.json');

var DatabaseSingleton = (function(){
  var instance;
  return {
    getInstance: function(){
      // check if instance is available
      if (!instance) {
        let databaseConfig;
        if (process.env.NODE_ENV === 'production') {
          databaseConfig = config.production
        } else {
          databaseConfig = config.development
        }
        instance = new Sequelize(databaseConfig.databaseName, databaseConfig.userName, databaseConfig.password, {
          host: databaseConfig.host,
          dialect: 'postgres',
          port: 5432,
      
          logging: console.log,                  // Default, displays the first parameter of the log function call
          // logging: (...msg) => console.log(msg), // Displays all log function call parameters
          // logging: false,                        // Disables logging
          // logging: msg => logger.debug(msg),     // Use custom logger (e.g. Winston or Bunyan), displays the first parameter
          // logging: logger.debug.bind(logger)     // Alternative way to use custom logger, displays all messages
      
          // pool: {
          //   max: 5,
          //   min: 0,
          //   acquire: 30000,
          //   idle: 10000
          // }
        })
        delete instance.constructor; // or set it to null
      }
      return instance;
    }
  };
})();

module.exports = DatabaseSingleton;