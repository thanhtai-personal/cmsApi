const CategoryService = require('../../services/baseModelServices/category.service');
const BaseController = require('./../base.controller');
class CategoryController extends BaseController {
  constructor () {
    super(new CategoryService());
  }
}

module.exports = CategoryController