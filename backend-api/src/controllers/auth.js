const jwt = require('../auth/jwt');
const googleAuth = require('../auth/google-auth');
const User = require('../models/user').user;
const RoleEnum = require('../utils/enums/role');
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

    root_admin_email = process.env.ROOT_ADMIN;

    if (loggedInUser.email == root_admin_email) {
      roleId = RoleEnum.oem_user;
    } else {
      roleId = RoleEnum.vehicle_owner;
    }

    [user, created] = await User.findOrCreate({
      where: { email: loggedInUser.email }, defaults: {
        email: loggedInUser.email,
        roleId: roleId,
        username: loggedInUser.name,
        pic: loggedInUser.pic,
        creationDate: new Date()
      }
    })
      .catch(err => { throw Error("SequelizeError") });
      
    if (!created && roleId == RoleEnum.oem_user && user.roleId == RoleEnum.vehicle_owner) {
      user.roleId = RoleEnum.oem_user;

      await user.save({
        fields: ['roleId']
      });
    }

    return res.json({ success: true, token: createToken(user) }).end();
  } catch (err) {
    next(err);
  };
};

module.exports.login = login;