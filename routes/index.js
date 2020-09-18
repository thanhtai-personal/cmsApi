const userRoute = require('./users')

module.exports = [
  {
    rootPath: '/user',
    routes: userRoute
  }
]