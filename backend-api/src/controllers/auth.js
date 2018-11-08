const jwt = require('../auth/jwt');
const googleAuth = require('../auth/google-auth');
const User = require('../models/user').user;

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
          throw new Error(e);
        });
      break;
    default:
      throw new Error('unknow token type [' + type + ']');
  }
};

const authenticate = login => {
  return getUser(login).then(principal => {
    return principal;
  });
};

const login = async (req, res) => {
  try {
    const login = req.body;
    authenticate(login).then(credentials => {
      loggedInUser = credentials.user;
      User
        .findOrCreate({
          where: { email: loggedInUser.email }, defaults: {
            email: loggedInUser.email,
            roleId: 1,
            username: loggedInUser.name,
            pic: loggedInUser.pic,
            creationDate: new Date()
          }
        })
        .spread((user, created) => {
          console.log(user.get({
            plain: true
          }));
          res.json({ success: true, data: { token: createToken(user)}}).end();
        });

    });
  } catch (error) {
    res.status(401).json({ success: false, error: 'invalid_social_login_token' }).end();
  } finally {
  }
};

module.exports.login = login;