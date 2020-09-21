const database = require('./../database');
const { DataTypes, Model } = require('sequelize');

const { postgresDb } = database
const sequelize = postgresDb.getInstance();

class Tag extends Model {}

Tag.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(75)
  },
  metaTitle: {
    type: DataTypes.STRING(100)
  },
  slug: {
    type: DataTypes.STRING(100)
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
  modelName: 'Tag',
  tableName: 'tag',
  timestamps: true,
  updatedAt: 'updateTimestamp' // I want updatedAt to actually be called updateTimestamp
});

// code first style
// (async () => {
//   await sequelize.sync({ force: true });
//   // Code here
// })();

module.exports = Tag