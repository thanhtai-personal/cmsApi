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
  mobile: {
    type: DataTypes.STRING(15),
    validate: {
      // is: /^[a-z]+$/i,          // matches this RegExp
      // is: ["^[a-z]+$",'i'],     // same as above, but constructing the RegExp from a string
      // not: /^[a-z]+$/i,         // does not match this RegExp
      // not: ["^[a-z]+$",'i'],    // same as above, but constructing the RegExp from a string
      // isEmail: true,            // checks for email format (foo@bar.com)
      // isUrl: true,              // checks for url format (http://foo.com)
      // isIP: true,               // checks for IPv4 (129.89.23.1) or IPv6 format
      // isIPv4: true,             // checks for IPv4 (129.89.23.1)
      // isIPv6: true,             // checks for IPv6 format
      // isAlpha: true,            // will only allow letters
      // isAlphanumeric: true,     // will only allow alphanumeric characters, so "_abc" will fail
      // isNumeric: true,          // will only allow numbers
      // isInt: true,              // checks for valid integers
      // isFloat: true,            // checks for valid floating point numbers
      // isDecimal: true,          // checks for any numbers
      // isLowercase: true,        // checks for lowercase
      // isUppercase: true,        // checks for uppercase
      // notNull: true,            // won't allow null
      // isNull: true,             // only allows null
      // notEmpty: true,           // don't allow empty strings
      // equals: 'specific value', // only allow a specific value
      // contains: 'foo',          // force specific substrings
      // notIn: [['foo', 'bar']],  // check the value is not one of these
      // isIn: [['foo', 'bar']],   // check the value is one of these
      // notContains: 'bar',       // don't allow specific substrings
      // len: [2,10],              // only allow values with length between 2 and 10
      // isUUID: 4,                // only allow uuids
      // isDate: true,             // only allow date strings
      // isAfter: "2011-11-05",    // only allow date strings after a specific date
      // isBefore: "2011-11-05",   // only allow date strings before a specific date
      // max: 23,                  // only allow values <= 23
      // min: 23,                  // only allow values >= 23
      // isCreditCard: true,       // check for valid credit card numbers

      // // Examples of custom validators:
      // isEven(value) {
      //   if (parseInt(value) % 2 !== 0) {
      //     throw new Error('Only even values are allowed!');
      //   }
      // },
      // isGreaterThanOtherField(value) {
      //   if (parseInt(value) <= parseInt(this.otherField)) {
      //     throw new Error('Bar must be greater than otherField.');
      //   }
      // }
    }
  },
  email: {
    type: DataTypes.STRING(50),
    isEmail: true,
  },
  passwordHash: {
    type: DataTypes.STRING(32),
    allowNull: false,
    is: /^[0-9a-f]{64}$/i,
    async set(value) {
      // Storing passwords in plaintext in the database is terrible.
      // Hashing the value with an appropriate cryptographic hash function is better.
      const generatedPassword = await passwordHash.generate(value)
      this.setDataValue('passwordHash', generatedPassword);
    }
  },
  admin: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    defaultValue: 0,
    set(value) {
      let settedValue = 0;
      if (value) settedValue = 1;
      this.setDataValue('admin', settedValue);
    }
  },
  vendor: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    defaultValue: 0,
    set(value) {
      let settedValue = 0;
      if (value) settedValue = 1;
      this.setDataValue('admin', settedValue);
    }
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
