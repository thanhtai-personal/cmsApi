
const routeConstants = require('./contants');
const routeFactory = require('./routeFactory')
const AuthController = require('./../controllers/auth.controller');

const { authRoutePaths, requestMethod } = routeConstants

const authController = new AuthController();
const userRoutes = [
  {
    path: authRoutePaths.login,
    controllerFunction: authController.login,
    method: requestMethod.post,
    // isPublic: true
  }, {
    path: authRoutePaths.register,
    controllerFunction: authController.register,
    method: requestMethod.post,
    // isPublic: true
  }, {
    path: authRoutePaths.getUser,
    controllerFunction: authController.getUserData,
    method: requestMethod.get
  }
]

const { generateMethod } = routeFactory

module.exports = generateMethod(userRoutes);
