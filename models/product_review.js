const database = require('./../database');
const { DataTypes, Model } = require('sequelize');

const { postgresDb } = database
const sequelize = postgresDb.getInstance();

class ProductReview extends Model {}

ProductReview.init({
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
  parentId: {
    type: DataTypes.UUID
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  rating: {
    type: DataTypes.SMALLINT,
    allowNull: false
  },
  published: {
    type: DataTypes.SMALLINT,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT
  },
  publishedAt: {
    type: DataTypes.DATE
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
  modelName: 'ProductReview',
  tableName: 'product_review',
  timestamps: true,
  updatedAt: 'updateTimestamp' // I want updatedAt to actually be called updateTimestamp
});

// code first style
// (async () => {
//   await sequelize.sync({ force: true });
//   // Code here
// })();

module.exports = ProductReview