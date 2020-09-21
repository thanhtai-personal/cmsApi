const { v4: uuidv4, NIL: NIL_UUID } = require('uuid');
const BaseController = require('./../base.controller');

class BaseModelController extends BaseController {
  constructor (service) {
    super(service);
    this.get = this.get.bind(this);
    this.createOrUpdate = this.createOrUpdate.bind(this);
    this.bulkCreate = this.bulkCreate.bind(this);
    this.findAll = this.findAll.bind(this);
  }

  async get (req, res, next) {
    const { id = NIL_UUID } = req;
    try {
      const result = await this.service.getById(id)
      res.send(this.bindSuccessDataResponse(result));
    } catch (error) {
      next(error)
    }
  }

  async createOrUpdate (req, res, next) {
    const { data = {} } = req;
    try {
      const result = await this.service.createOrUpdate(data)
      res.send(this.bindSuccessDataResponse(result));
    } catch (error) {
      next(error)
    }
  }

  async bulkCreate (req, res, next) {
    const { data = [] } = req;
    try {
      const result = await this.service.bulkCreate(data)
      res.send(this.bindSuccessDataResponse(result));
    } catch (error) {
      next(error)
    }
  }

  async findAll (req, res, next) {
    const { data = {} } = req;
    try {
      const result = await this.service.findAll(data)
      res.send(this.bindSuccessDataResponse(result));
    } catch (error) {
      next(error)
    }
  }
}

module.exports = BaseModelController