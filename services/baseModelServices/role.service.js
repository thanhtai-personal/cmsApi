const BaseService = require('./baseModel.service');
const RoleModel = require('./../../models/role');

class RoleService extends BaseService {
  constructor() {
    super(RoleModel);
  }
}

module.exports = RoleService