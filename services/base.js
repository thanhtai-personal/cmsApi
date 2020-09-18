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
        console.log('getById not found!');
        return null;
      }
      return result;
    } catch (error) {
      console.log('getById failed!', error);
      throw(error);
    }
  }

  async create (data) {
    if(!this.model) return null;
    try {
      const result = await this.model.create(data)
      console.log('created successful!');
      return result;
    } catch (error) {
      console.log('create failed!', error);
      throw(error);
    }
  }

  async update (data) {
    if(!this.model) return null;
    try {
      const result = await this.model.update(data);
      console.log('updated successful!');
      return result;
    } catch (error) {
      console.log('update failed!', error);
      return null;
    }
  }

  async findAll (queryData) {
    if(!this.model) return []
    try {
      const result = await this.model.findAll(queryData);
      return result;
    } catch (error) {
      console.log('query failed!', error);
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
      console.log('create or update error', error);
      throw(error);
    }
  }

  async delete (queryData) {
    //// unsupported delete record
    // if(!this.model) return
    // try {
    //   await this.model.destroy(queryData);
    //   console.log('deleted success!', error);
    // } catch (error) {
    //   console.log('delete failed!', error);
    //   throw(error);
    // }
  }

  async bulkCreate (dataList) {
    if (Array.isArray(dataList)) {
      if(!this.model) return;
      try {
        await this.model.bulkCreate(dataList);
        console.log('bulkCreated successful!');
      } catch (error) {
        console.log('bulkCreate failed!', error);
        throw(error);
      }
    }
  }
  
}

module.exports = BaseService