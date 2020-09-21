const database = require('./../database');
const { DataTypes, Model } = require('sequelize');

const { postgresDb } = database
const sequelize = postgresDb.getInstance();

class Role extends Model {}

Role.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.TEXT
  },
  description: {
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
  modelName: 'Role',
  tableName: 'role',
  timestamps: true,
  updatedAt: 'updateTimestamp' // I want updatedAt to actually be called updateTimestamp
});

// code first style
// (async () => {
//   await sequelize.sync({ force: true });
//   // Code here
// })();

module.exports = Role