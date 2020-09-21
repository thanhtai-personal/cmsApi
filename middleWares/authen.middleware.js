const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const { publicAPIs } = require('./publicApis.json');
const authenConfig = require('./configAuthen.json');

const checkPublicApi = (path) => {
  return !!publicAPIs.includes(path)
}

const checkAuthenticate = (req, res, next) => {
  if (checkPublicApi(req.url)) return next();
  let token = (req && req.body && req.body.token) || req.headers['x-access-token'] || '';
  if (token) {
    jwt.verify(token, authenConfig.secretKey, function (err, data) {
      if (err) {
        res.send({error: createError(401), data: err})
      } else {
        req.authData = data;
        next();
      }
    });
  }
  else {
    res.send({error: createError(401)})
  }
}

module.exports = {
  checkAuthenticate
}