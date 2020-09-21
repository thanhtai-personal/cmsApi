const CategoryService = require('../../services/baseModelServices/category.service');
const BaseModelController = require('./../base.controller');
class CategoryController extends BaseModelController {
  constructor () {
    super(new CategoryService());
  }
}

module.exports = CategoryController