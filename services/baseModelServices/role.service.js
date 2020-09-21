const BaseService = require('./../base');
const RoleModel = require('./../../models/role');

class RoleService extends BaseService {
  constructor() {
    super(RoleModel);
  }
}

module.exports = RoleService