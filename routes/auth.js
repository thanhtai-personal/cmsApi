
const routeConstants = require('./contants');
const routeFactory = require('./routeFactory')
const AuthController = require('./../controllers/auth.controller');

const { authRoutePaths, requestMethod } = routeConstants

const authController = new AuthController();
const authRoutes = [
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
    path: authRoutePaths.getAuthData,
    controllerFunction: authController.getAuthData,
    method: requestMethod.get
  }, {
    path: authRoutePaths.googleLogin,
    controllerFunction: authController.googleLogin,
    method: requestMethod.post
  }
]

const { generateMethod } = routeFactory;

module.exports = generateMethod(authRoutes);
