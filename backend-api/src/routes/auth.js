const Auth = require('../controllers/auth');
const { wrapAsync } = require('../utils/controllers');

module.exports = (api, basePath) => {
  api.route(`${basePath}/auth/login`).post(wrapAsync(Auth.login));
  api.route(`${basePath}/auth/login/mobile`).post(wrapAsync(Auth.loginMobile));
};
