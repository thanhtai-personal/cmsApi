const express = require('express');
const router = express.Router();
var appSingleton = require('../appSingleton');

const routeConstants = require('./contants');

const { requestMethod } = routeConstants

var app = appSingleton.getInstance()

module.exports = {
  produceRoute: (routeObj) => {
    app.use(`${routeObj.rootPath}`, routeObj.routes);
  },
  generateMethod: (routesList) => {
    routesList.forEach((routeObj) => {
      switch (routeObj.method) {
        case requestMethod.get:
          router.get(routeObj.path, routeObj.controllerFunction);
          break;
        case requestMethod.post:
          router.post(routeObj.path, routeObj.controllerFunction);
          break;
        case requestMethod.put:
          router.put(routeObj.path, routeObj.controllerFunction);
          break;
        case requestMethod.delete:
          router.delete(routeObj.path, routeObj.controllerFunction);
          break;
      }
    })
    return router
  }
}