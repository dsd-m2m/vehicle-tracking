const jwt = require('../auth/jwt');
const googleAuth = require('../auth/google-auth');
const User = require('../models/user').user;
const RoleEnum = require('../utils/enums/role');

const createToken = user => jwt.generateToken(user);

const getUser = async (login, isMobile) => googleAuth
  .getGoogleUser(login.social_token, isMobile)
  .then((response) => {
    const content = {
      token: createToken(response),
      user: response,
    };
    return content;
  })
  .catch((err) => {
    throw new Error(`Authentification error: ${err.message}`);
  });

const processLogin = async (req, res, next, loggedInUser) => {
  const rootAdminEmail = process.env.ROOT_ADMIN;

  let roleId = RoleEnum.vehicle_owner;
  if (loggedInUser.email === rootAdminEmail) {
    roleId = RoleEnum.oem_user;
  }

  const [user, created] = await User.findOrCreate({
    where: { email: loggedInUser.email },
    defaults: {
      email: loggedInUser.email,
      roleId,
      username: loggedInUser.name,
      pic: loggedInUser.pic,
      creationDate: new Date(),
    },
  })
    .catch(() => { throw Error('SequelizeError'); });

  if (!created && roleId === RoleEnum.oem_user && user.roleId === RoleEnum.vehicle_owner) {
    user.roleId = RoleEnum.oem_user;
    await user.save({
      fields: ['roleId'],
    }).catch(() => { throw Error('SequelizeError:'); });
  }
  return res.json({ token: createToken(user) }).end();
}

const loginMobile = async (req, res, next) => {
  const loginData = req.body;
  try {
    const credentials = await getUser(loginData, true).catch((err) => {
      throw new Error(`Authentification error: ${err.message}`);
    });
    const loggedInUser = credentials.user;

    return processLogin(req, res, next, loggedInUser);
  } catch (err) {
    return next(err);
  }
}


const loginWeb = async (req, res, next) => {
  const loginData = req.body;
  try {
    const credentials = await getUser(loginData, false).catch(() => {
      throw new Error('Authentification error');
    });
    const loggedInUser = credentials.user;

    return processLogin(req, res, next, loggedInUser);
  } catch (err) {
    return next(err);
  }
};

module.exports = { loginWeb, loginMobile };
