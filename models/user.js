const database = require('./../database');
const { DataTypes, Model } = require('sequelize');
const passwordHash = require('password-hash')

const { postgresDb } = database
const sequelize = postgresDb.getInstance();

class User extends Model {}

User.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING(50),
    // get() {
    //   const rawValue = this.getDataValue(firstName);
    //   return rawValue ? rawValue.toUpperCase() : null;
    // }
  },
  lastName: {
    type: DataTypes.STRING(50)
  },
  middleName: {
    type: DataTypes.STRING(50)
  },
  fullName: {
    type: DataTypes.STRING(150)
  },
  intro: {
    type: DataTypes.TEXT
  },
  profile: {
    type: DataTypes.TEXT
  },
  isDelete: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    defaultValue: 0,
    set(value) {
      let settedValue = 0;
      if (value) settedValue = 1;
      this.setDataValue('admin', settedValue);
    }
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
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User', // We need to choose the model name
  tableName: 'user',
  // freezeTableName: true,
  timestamps: true,
  // createdAt: false, // I don't want createdAt
  // updatedAt: 'updateTimestamp' // I want updatedAt to actually be called updateTimestamp
});

// code first style
// (async () => {
//   await sequelize.sync({ force: true });
//   // Code here
// })();

module.exports = User


// const { DataTypes, Model } = require('sequelize');
// const database = require('./../database');

// const { postgresDb, databaseConnect } = database
// databaseConnect()

// const User = sequelize.define('user', {
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
