const jsonwebtoken = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const config = require('../config');

module.exports.generateToken = user => jsonwebtoken.sign(
  {
    sub: user.id,
  },
  config.jwt.secret,
  {
    expiresIn: config.jwt.expiresIn,
  },
);

module.exports.jwt = () => expressJwt({ secret: config.jwt.secret }).unless({
  path: ['/api-docs', '/api/auth/login', '/api/auth/login/mobile', '/api/ping/public'],
});
