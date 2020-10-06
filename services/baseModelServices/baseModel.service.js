const BaseService = require('../base');
const { v4: uuidv4, NIL: NIL_UUID } = require('uuid');

class BaseModelService extends BaseService {
  constructor (model, customContext = null) {
    super();
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
    this.logger.log = this.logger.log.bind(this)
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
        this.logger.log(`${this.model.constructor.name} - getById`, 'not found');
        return null;
      }
      return result;
    } catch (error) {
      this.logger.log(`service - ${this.model.constructor.name} - getById failed!`, error);
      throw(error);
    }
  }

  async create (data) {
    if(!this.model) return null;
    try {
      const result = await this.model.create(data)
      this.logger.log(`service - ${this.model.constructor.name}`, `created successful!`);
      return result;
    } catch (error) {
      this.logger.log(`service - ${this.model.constructor.name} - create failed!`, error);
      throw(error);
    }
  }

  async update (data) {
    if(!this.model) return null;
    try {
      const result = await this.model.update(data);
      this.logger.log(`service - ${this.model.constructor.name}`, `updated successful!`);
      return result;
    } catch (error) {
      this.logger.log(`service - ${this.model.constructor.name} - update failed!`, error);
      throw error;
    }
  }

  async findAll (queryData) {
    if(!this.model) return []
    try {
      const result = await this.model.findAll(queryData);
      return result;
    } catch (error) {
      this.logger.log(`service - ${this.model.constructor.name} - query failed!`, error);
      throw(error);
    }
  }

  async createOrUpdate (data) {
    try {
      let model = null;
      let result = null;
      if (data.id) {
        model = await this.getById(data.id);
      } else {
        data.id = uuidv4();
      }
      if (model) {
        result = await this.update(data);
      } else {
        result = await this.create(data);
      }
      return result
    } catch (error) {
      this.logger.log(`service - ${this.model.constructor.name} - create or update error`, error);
      throw(error);
    }
  }

  async delete (queryData) {
    //// unsupported delete record
    // if(!this.model) return
    // try {
    //   await this.model.destroy(queryData);
    //   this.logger.log(`service - ${this.model.constructor.name} - deleted success!`, error);
    // } catch (error) {
    //   this.logger.log(`service - ${this.model.constructor.name} - delete failed!`, error);
    //   throw(error);
    // }
  }

  async bulkCreate (dataList) {
    if (Array.isArray(dataList)) {
      if(!this.model) return;
      try {
        await this.model.bulkCreate(dataList);
        this.logger.log(`service - ${this.model.constructor.name}`, `bulkCreated successful!`);
      } catch (error) {
        this.logger.log(`service - ${this.model.constructor.name} - bulkCreate failed!`, error);
        throw(error);
      }
    }
  }
  
}

module.exports = BaseModelService