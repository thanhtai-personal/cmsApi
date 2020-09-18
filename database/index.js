const sequelize = require('./sequelizeConnection/postgres')

module.exports = {
  postgresDb: sequelize,
  databaseConnect: async () => {
    try {
      await sequelize.authenticate();
      console.log('database connection has been established successfully by sequelize.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  },
  closeConnection: async () => {
    try {
      await sequelize.close();
      console.log('database connection has been closed successfully by sequelize.');
    } catch (error) {
      console.error('Unable to close to the database:', error);
    }
  }
}