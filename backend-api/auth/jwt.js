var jwt = require('jsonwebtoken');
const config = require('../config.json');
module.exports.verify = token => {
    return jwt.verify(token, config.jwtSecret);
};

module.exports.generateToken = user => {
    return jwt.sign(
      {
        sub: user.id,
      },
      config.jwtSecret,
      {
        expiresIn: config.jwtExpiresIn
      }
    );
  };