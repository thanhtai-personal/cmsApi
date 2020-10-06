const database = require('./../database');
const { DataTypes, Model } = require('sequelize');

const { postgresDb } = database
const sequelize = postgresDb.getInstance();

class Product extends Model {}

Product.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(75),
    allowNull: false
  },
  metaTitle: {
    type: DataTypes.STRING(100)
  },
  slug: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  summary: {
    type: DataTypes.TEXT
  },
  type: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    defaultValue: 0
  },
  sku: {
    type: DataTypes.STRING(100)
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
    type: DataTypes.SMALLINT
  },
  shop: {
    type: DataTypes.SMALLINT
  },
  publishedAt: {
    type: DataTypes.DATE
  },
  startAt: {
    type: DataTypes.DATE
  },
  endAt: {
    type: DataTypes.DATE
  },
  isDelete: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    defaultValue: 0
  },
  content: {
    type: DataTypes.TEXT,
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
  modelName: 'Product',
  tableName: 'product',
  timestamps: true,
});

// code first style
// (async () => {
//   await sequelize.sync({ force: true });
//   // Code here
// })();

module.exports = Product