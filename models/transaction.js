const database = require('./../database');
const { DataTypes, Model } = require('sequelize');

const { postgresDb } = database
const sequelize = postgresDb.getInstance();

class Transaction extends Model {}

Transaction.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
  },
  orderId: {
    type: DataTypes.UUID,
  },
  code: {
    type: DataTypes.STRING(100)
  },
  type: {
    type: DataTypes.SMALLINT
  },
  mode: {
    type: DataTypes.SMALLINT
  },
  status: {
    type: DataTypes.SMALLINT
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  content: {
    type: DataTypes.TEXT
  },
  isDelete: {
    type: DataTypes.SMALLINT,
    defaultValue: 0
  }
}, {
  sequelize,
  modelName: 'Transaction',
  tableName: 'transaction',
  timestamps: true,
  updatedAt: 'updateTimestamp' // I want updatedAt to actually be called updateTimestamp
});

// code first style
// (async () => {
//   await sequelize.sync({ force: true });
//   // Code here
// })();

module.exports = Transaction