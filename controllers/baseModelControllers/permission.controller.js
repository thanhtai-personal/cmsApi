const PermissionService = require('../../services/baseModelServices/permission.service');
const BaseController = require('./../base.controller');
class PermissionController extends BaseController {
  constructor () {
    super(new PermissionService());
  }
}

module.exports = PermissionController