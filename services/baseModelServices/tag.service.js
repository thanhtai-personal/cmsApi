const BaseService = require('./../base');
const TagModel = require('./../../models/tag');

class TagService extends BaseService {
  constructor() {
    super(TagModel);
  }
}

module.exports = TagService