// const { DataTypes, Model } = require('sequelize');
// const database = require('./../database');

// const { postgresDb, databaseConnect } = database
// databaseConnect()

// const User = postgresDb.define('user', {
//   // Model attributes are defined here
//   id: {
//     type: DataTypes.UUID,
//     allowNull: false
//   },
//   firstName: {
//     type: DataTypes.STRING(50)
//   },
//   lastName: {
//     type: DataTypes.STRING(50)
//   },
//   middleName: {
//     type: DataTypes.STRING(50)
//   },
//   mobile: {
//     type: DataTypes.STRING(15)
//   },
//   email: {
//     type: DataTypes.STRING(50)
//   },
//   passwordHash: {
//     type: DataTypes.STRING(32)
//   },
//   admin: {
//     type: DataTypes.SMALLINT
//   },
//   vendor: {
//     type: DataTypes.SMALLINT
//   },
//   registeredAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW
//   },
//   lastLogin: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW
//   },
//   intro: {
//     type: DataTypes.TEXT
//   },
//   profile: {
//     type: DataTypes.TEXT
//   },
//   role: {
//     type: DataTypes.UUID
//   },
//   isDelete: {
//     type: DataTypes.SMALLINT,
//     defaultValue: 0
//   }
// }, {
//   // Other model options go here
//   // freezeTableName: true,
//   // tableName: 'user'
// });

// module.exports = User

const database = require('./../database');
const { DataTypes, Model } = require('sequelize');

const { postgresDb } = database

class User extends Model {}

User.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING(50)
  },
  lastName: {
    type: DataTypes.STRING(50)
  },
  middleName: {
    type: DataTypes.STRING(50)
  },
  mobile: {
    type: DataTypes.STRING(15)
  },
  email: {
    type: DataTypes.STRING(50)
  },
  passwordHash: {
    type: DataTypes.STRING(32)
  },
  admin: {
    type: DataTypes.SMALLINT
  },
  vendor: {
    type: DataTypes.SMALLINT
  },
  registeredAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  lastLogin: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  intro: {
    type: DataTypes.TEXT
  },
  profile: {
    type: DataTypes.TEXT
  },
  role: {
    type: DataTypes.UUID
  },
  isDelete: {
    type: DataTypes.SMALLINT,
    defaultValue: 0
  }
}, {
  // Other model options go here
  postgresDb, // We need to pass the connection instance
  modelName: 'User', // We need to choose the model name
  tableName: 'user',
  // freezeTableName: true,
  timestamps: true,
  // createdAt: false, // I don't want createdAt
  // updatedAt: 'updateTimestamp' // I want updatedAt to actually be called updateTimestamp
});
