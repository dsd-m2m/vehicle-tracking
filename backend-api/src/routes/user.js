const User = require('../controllers/user');
const { wrapAsync } = require('../utils/controllers');
const { requireAdmin } = require('../utils/controllers');

module.exports = (api, basePath) => {
  api.route(`${basePath}/user/:id`).get(requireAdmin(), wrapAsync(User.get));
  api.route(`${basePath}/me`).get(wrapAsync(User.me));
  api.route(`${basePath}/user`).get(requireAdmin(), wrapAsync(User.all));
  api.route(`${basePath}/user/:id`).delete(requireAdmin(), wrapAsync(User.remove));
};
