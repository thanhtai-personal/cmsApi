class BaseController {
  constructor (service) {
    this.service = service;
    this.bindSuccessDataResponse = this.bindSuccessDataResponse.bind(this)
  }

  bindSuccessDataResponse(data) {
    return {
      message: 'success data',
      data,
      code: 200
    }
  }
}

module.exports = BaseController