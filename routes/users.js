
const routeConstants = require('./contants');
const routeFactory = require('./routeFactory')
const UserController = require('./../controllers/user');

const { userRoutePaths, requestMethod } = routeConstants

const userController = new UserController();
const userRoutes = [
  {
    path: userRoutePaths.get,
    controllerFunction: userController.get,
    method: requestMethod.get
  }, {
    path: userRoutePaths.getAll,
    controllerFunction: userController.findAll,
    method: requestMethod.get
  }, {
    path: userRoutePaths.createOrUpdate,
    controllerFunction: userController.createOrUpdate,
    method: requestMethod.post
  }, {
    path: userRoutePaths.getByEmail,
    controllerFunction: userController.getByEmail,
    method: requestMethod.post
  }
]

const { generateMethod } = routeFactory

module.exports = generateMethod(userRoutes);
