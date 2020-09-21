const baseModelConstants = require('./baseModelRoutes/constant')

const requestMethod = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE'
}

const authRoutePaths = {
  login: '/login',
  register: '/register',
  getAuthData: '/get'
}


module.exports = {
  requestMethod,
  authRoutePaths,
  ...baseModelConstants
}