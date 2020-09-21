const userRoute = require('./baseModelRoutes/users')

module.exports = [
  {
    rootPath: '/user',
    routes: userRoute
  }
]