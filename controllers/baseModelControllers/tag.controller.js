const TagService = require('../../services/baseModelServices/tag.service');
const BaseModelController = require('./../base.controller');
class TagController extends BaseModelController {
  constructor () {
    super(new TagService());
  }
}

module.exports = TagController