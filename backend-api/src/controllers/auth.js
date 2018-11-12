const jwt = require('../auth/jwt');
const googleAuth = require('../auth/google-auth');
const User = require('../models/user').user;

const createToken = user => {
  return jwt.generateToken(user);
};

const getUser = async login => {

  return googleAuth
    .getGoogleUser(login.social_token)
    .then(response => {
      const content = {
        token: createToken(response),
        user: response
      };
      return content;
    })
    .catch(e => {
      throw new Error("Authentification error");
    });
};

const authenticate = async login => {
  return getUser(login).then(principal => {
    return principal;
  });
};

const login = async (req, res, next) => {
  const login = req.body;
  try {
    credentials = await authenticate(login);
    loggedInUser = credentials.user;

    [user, created] = await User.findOrCreate({
      where: { email: loggedInUser.email }, defaults: {
        email: loggedInUser.email,
        roleId: 1,
        username: loggedInUser.name,
        pic: loggedInUser.pic,
        creationDate: new Date()
      }
    }).catch(err => { throw Error("SequelizeError") });
    return res.json({ success: true, token: createToken(user) }).end();
  } catch (err) {
    next(err);
  };
};

module.exports.login = login;