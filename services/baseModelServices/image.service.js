const BaseService = require('./baseModel.service');
const ImageModel = require('./../../models/image');

class ImageService extends BaseService {
  constructor() {
    super(ImageModel);
    this.logger.log = this.logger.log.bind(this);
  }
}

module.exports = ImageService