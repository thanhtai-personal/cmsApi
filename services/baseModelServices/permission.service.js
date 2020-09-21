const BaseService = require('./baseModel.service');
const PermissionModel = require('./../../models/permission');

class PermissionService extends BaseService {
  constructor() {
    super(PermissionModel);
  }
}

module.exports = PermissionService