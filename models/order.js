const database = require('./../database');
const { DataTypes, Model } = require('sequelize');

const { postgresDb } = database
const sequelize = postgresDb.getInstance();

class Order extends Model {}

Order.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  sessionId: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  token: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  status: {
    type: DataTypes.SMALLINT,
    allowNull: false
  },
  subTotal: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  itemDiscount: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0
  },
  tax: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0
  },
  shipping: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  total: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  promo: {
    type: DataTypes.STRING(50)
  },
  discount: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0
  },
  grandTotal: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  note: {
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
  modelName: 'Order',
  tableName: 'order',
  timestamps: true,
});

// code first style
// (async () => {
//   await sequelize.sync({ force: true });
//   // Code here
// })();

module.exports = Order