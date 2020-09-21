const { publicAPIs } = require('./publicApis.json');
const authenConfig = require('./configAuthen.json');
const createError = require('http-errors');

const checkPublicApi = (path) => {
  return !!publicAPIs.includes(path)
}

const checkAuthenticate = (req, res, next) => {
  if (checkPublicApi(req.url)) return next();
  let token = (req && req.body && req.body.token) || req.headers['x-access-token'] || '';
  if (token) {
    jwt.verify(token, authenConfig.secretKey, function (err, decoded) {
      if (err) {
        res.send({error: createError(401), data: err})
      } else {
        req.decoded = decoded;
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