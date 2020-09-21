const database = require('./../database');
const { postgresDb } = database;

class BaseService {
  constructor (model, customContext = null) {
    this.dbContext = postgresDb;
    if (customContext) {
      this.dbContext = customContext;
    }
    this.model = model;
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.findAll = this.findAll.bind(this);
    this.createOrUpdate = this.createOrUpdate.bind(this);
    this.delete = this.delete.bind(this);
    this.bulkCreate = this.bulkCreate.bind(this);
  }

  async getById (id) {
    if(!this.model) return null;
    try {
      const result = await this.model.findOne({
        where: {
          id
        }
      });
      if (!result) {
        console.log(`service - ${this.model.constructor.name} - getById not found!`);
        return null;
      }
      return result;
    } catch (error) {
      console.log(`service - ${this.model.constructor.name} - getById failed!`, error);
      throw(error);
    }
  }

  async create (data) {
    if(!this.model) return null;
    try {
      const result = await this.model.create(data)
      console.log(`service - ${this.model.constructor.name} - created successful!`);
      return result;
    } catch (error) {
      console.log(`service - ${this.model.constructor.name} - create failed!`, error);
      throw(error);
    }
  }

  async update (data) {
    if(!this.model) return null;
    try {
      const result = await this.model.update(data);
      console.log(`service - ${this.model.constructor.name} - updated successful!`);
      return result;
    } catch (error) {
      console.log(`service - ${this.model.constructor.name} - update failed!`, error);
      return null;
    }
  }

  async findAll (queryData) {
    if(!this.model) return []
    try {
      const result = await this.model.findAll(queryData);
      return result;
    } catch (error) {
      console.log(`service - ${this.model.constructor.name} - query failed!`, error);
      throw(error);
    }
  }

  async createOrUpdate (data) {
    try {
      const user = await this.getById(data.id);
      if (!user) {
        await this.create(data);
      } else {
        await this.update(data);
      }
    } catch (error) {
      console.log(`service - ${this.model.constructor.name} - create or update error`, error);
      throw(error);
    }
  }

  async delete (queryData) {
    //// unsupported delete record
    // if(!this.model) return
    // try {
    //   await this.model.destroy(queryData);
    //   console.log(`service - ${this.model.constructor.name} - deleted success!`, error);
    // } catch (error) {
    //   console.log(`service - ${this.model.constructor.name} - delete failed!`, error);
    //   throw(error);
    // }
  }

  async bulkCreate (dataList) {
    if (Array.isArray(dataList)) {
      if(!this.model) return;
      try {
        await this.model.bulkCreate(dataList);
        console.log(`service - ${this.model.constructor.name} - bulkCreated successful!`);
      } catch (error) {
        console.log(`service - ${this.model.constructor.name} - bulkCreate failed!`, error);
        throw(error);
      }
    }
  }
  
}

module.exports = BaseService