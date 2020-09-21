const RoleService = require('../../services/baseModelServices/role.service');
const BaseController = require('./../base.controller');
class RoleController extends BaseController {
  constructor () {
    super(new RoleService());
  }
}

module.exports = RoleController