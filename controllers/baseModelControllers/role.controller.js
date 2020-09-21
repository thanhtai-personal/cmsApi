const RoleService = require('../../services/baseModelServices/role.service');
const BaseModelController = require('./../base.controller');
class RoleController extends BaseModelController {
  constructor () {
    super(new RoleService());
  }
}

module.exports = RoleController