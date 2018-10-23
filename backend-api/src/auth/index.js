const jwt = require('./jwt');
const googleAuth = require('./google-auth');
const config = require('../config/config')
const createToken = user => {
    return jwt.generateToken(user);
  };

  const getUser = login => {
    const type = login.type;
    switch (type) {
      case 'google':
        return googleAuth
          .getGoogleUser(login.code)
          .then(response => {
            const content = {
              token: createToken(response),
              user: response
            };
            return content;
          })
          .catch(e => {
            console.log(e);
            throw new Error(e);
          });
        break;
      default:
        throw new Error('unknow token type [' + type + ']');
    }
  };

  
const isProtectedResource = (req) => {
    let unprotectedPaths = config.unprotectedRoutes
    let unprotectedPath = unprotectedPaths.filter(path =>
      req.url.startsWith(path)
    );
    if (unprotectedPath.length == 0) {
      return true;
    }
    return false;
  };

  const checkToken = req => {
    let authorization = req.get('authorization');
    if (!authorization) {
      throw new Error(401);
    }
    let token = authorization.replace('Bearer ', '');
    return jwt.verify(token);
  };

  class Authentication {
    constructor() {
    }
  
    filter() {
      return (req, res, next) => {
        try {
          let shouldProtect = isProtectedResource(req);
  
          if (shouldProtect) {
            let principal = checkToken(req);
            res.locals.principal = principal;
          }
          next();
        } catch (e) {
          console.log('unauthorized', e);
          res.status(401).json({ success: false, error: 'not_authorized' }).end();
        }
      };
    }
  
    authenticate(login) {
      return getUser(login).then(principal => {
        return principal;
      });
    }
  }
  
  module.exports = Authentication;