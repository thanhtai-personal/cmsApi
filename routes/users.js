
const routeConstants = require('./contants');
const routeFactory = require('./routeFactory')
const userController = require('./../controllers/user');

const { userRoutePaths, requestMethod } = routeConstants
const userRoutes = [
  {
    path: userRoutePaths.get,
    controller: userController.get,
    method: requestMethod.get
  }
]

const { generateMethod } = routeFactory

module.exports = generateMethod(userRoutes);
