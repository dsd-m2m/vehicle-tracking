var jsonwebtoken = require('jsonwebtoken');
var expressJwt = require('express-jwt')
const config = require('../config');

module.exports.generateToken = user => {
    return jsonwebtoken.sign(
      {
        sub: user.id,
      },
      config.jwt.secret,
      {
        expiresIn: config.expiresIn
      }
    );
  };

module.exports.jwt = () => {
  return expressJwt({ secret: config.jwt.secret }).unless({
      path: ["/api/auth/login", "/api/ping/public"]
  });
};