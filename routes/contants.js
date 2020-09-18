const requestMethod = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE'
}

const userRoutePaths = {
  get: '/get/:id',
  getByEmail: '/getByEmail',
  createOrUpdate: '/createOrUpdate',
  getAll: '/getAll',
  // bulkCreate: '/bulkCreate' //no support this for user
}

module.exports = {
  requestMethod,
  userRoutePaths
}