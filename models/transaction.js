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
  content: {
    type: DataTypes.TEXT
  },
  isDelete: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    defaultValue: 0
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Transaction',
  tableName: 'transaction',
  timestamps: true,
});

// code first style
// (async () => {
//   await sequelize.sync({ force: true });
//   // Code here
// })();

module.exports = Transaction