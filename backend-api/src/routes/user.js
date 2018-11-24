const User = require('../controllers/user');
const { wrapAsync } = require('../utils/controllers');
const { requireAdmin } = require('../utils/controllers');

module.exports = (api, basePath) => {
  api.route(`${basePath}/user/:userId`).get(wrapAsync(User.getById));
  api.route(`${basePath}/user`).get(requireAdmin(), wrapAsync(User.getAll));
};
