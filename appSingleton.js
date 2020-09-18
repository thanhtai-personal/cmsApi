var express = require('express');

var AppSingleton = (function(){
  var instance;
  return {
    getInstance: function(){
      // check if instance is available
      if (!instance) {
        instance = express();
        delete instance.constructor; // or set it to null
      }
      return instance;
    }
  };
})();

module.exports = AppSingleton;