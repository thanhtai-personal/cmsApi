const BaseService = require('./../base');
const CategoryModel = require('./../../models/category');

class CategoryService extends BaseService {
  constructor() {
    super(CategoryModel);
  }
}

module.exports = CategoryService