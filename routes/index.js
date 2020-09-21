const userRoute = require('./baseModelRoutes/users')
const authRoute = require('./auth')

module.exports = [
  {
    rootPath: '/user',
    routes: userRoute
  },
  {
    rootPath: '/auth',
    routes: authRoute
  }
]