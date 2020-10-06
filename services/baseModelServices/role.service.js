const BaseService = require('./baseModel.service');
const RoleModel = require('./../../models/role');

class RoleService extends BaseService {
  constructor() {
    super(RoleModel);
    this.logger.log = this.logger.log.bind(this);
    this.getByTitle = this.getByTitle.bind(this);
  }

  async getByTitle(title) {
    if(!this.model) return null;
    try {
      const result = await this.model.findOne({
        where: {
          title
        }
      });
      if (!result) {
        this.logger.log(`${this.model.constructor.name} - getByTitle`, 'not found');
        return null;
      }
      return result;
    } catch (error) {
      this.logger.log(`service - ${this.model.constructor.name} - getByTitle failed!`, error);
      throw(error);
    }
  }

}

module.exports = RoleService