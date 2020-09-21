const PermissionService = require('../../services/baseModelServices/permission.service');
const BaseModelController = require('./../base.controller');
class PermissionController extends BaseModelController {
  constructor () {
    super(new PermissionService());
  }
}

module.exports = PermissionController