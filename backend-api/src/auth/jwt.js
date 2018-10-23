var jsonwebtoken = require('jsonwebtoken');
var expressJwt = require('express-jwt')
const config = require('../config/config.json');

module.exports.generateToken = user => {
    return jsonwebtoken.sign(
      {
        sub: user.id,
      },
      config.jwtSecret,
      {
        expiresIn: config.jwtExpiresIn
      }
    );
  };

module.exports.jwt = () => {
  return expressJwt({ secret: config.jwtSecret }).unless({
      path: config.unprotectedRoutes
  });
};