const database = require('./../database');
const { DataTypes, Model } = require('sequelize');

const { postgresDb } = database
const sequelize = postgresDb.getInstance();

class CartItem extends Model {}

CartItem.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  cartId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  sku: {
    type: DataTypes.STRING(100),
    // allowNull: false
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  discount: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0
  },
  quantity: {
    type: DataTypes.SMALLINT,
    allowNull: false
  },
  active: {
    type: DataTypes.SMALLINT,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
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
  modelName: 'CartItem',
  tableName: 'cart_item',
  timestamps: true,
  updatedAt: 'updateTimestamp' // I want updatedAt to actually be called updateTimestamp
});

// code first style
// (async () => {
//   await sequelize.sync({ force: true });
//   // Code here
// })();

module.exports = CartItem