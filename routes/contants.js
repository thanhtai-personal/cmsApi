const baseModelConstants = require('./baseModelRoutes/constant')

const requestMethod = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE'
}


module.exports = {
  requestMethod,
  ...baseModelConstants
}