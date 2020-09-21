const database = require('./../database');
const { DataTypes, Model } = require('sequelize');

const { postgresDb } = database
const sequelize = postgresDb.getInstance();

class ProductMeta extends Model {}

ProductMeta.init({
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
  key: {
    type: DataTypes.STRING(50),
    allowNull: false
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
  modelName: 'ProductMeta',
  tableName: 'product_meta',
  timestamps: true,
  updatedAt: 'updateTimestamp' // I want updatedAt to actually be called updateTimestamp
});

// code first style
// (async () => {
//   await sequelize.sync({ force: true });
//   // Code here
// })();

module.exports = ProductMeta