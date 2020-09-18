const { Sequelize } = require('sequelize');

var sequelize;

if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize('d970hatls108fr', 'xwlmrkzbcrnoxp', 'bd2ca6cf649338bb6c9f2cc482c1d5902785825bc1733682c61107515ce6e072', {
    host: 'ec2-50-19-231-222.compute-1.amazonaws.com',
    dialect: 'postgres',
    port: 5432,
  })
} else {
  sequelize = new Sequelize('shop', 'postgres', '', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,

    logging: console.log,                  // Default, displays the first parameter of the log function call
    // logging: (...msg) => console.log(msg), // Displays all log function call parameters
    // logging: false,                        // Disables logging
    // logging: msg => logger.debug(msg),     // Use custom logger (e.g. Winston or Bunyan), displays the first parameter
    // logging: logger.debug.bind(logger)     // Alternative way to use custom logger, displays all messages

    
  })
}

module.exports = sequelize;