const TagService = require('../../services/baseModelServices/tag.service');
const BaseController = require('./../base.controller');
class TagController extends BaseController {
  constructor () {
    super(new TagService());
  }
}

module.exports = TagController