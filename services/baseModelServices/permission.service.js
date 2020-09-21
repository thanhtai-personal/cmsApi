const BaseService = require('./../base');
const PermissionModel = require('./../../models/permission');

class PermissionService extends BaseService {
  constructor() {
    super(PermissionModel);
  }
}

module.exports = PermissionService