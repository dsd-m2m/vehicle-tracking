const Role = require('../controllers/role');
const { wrapAsync } = require('../utils/controllers');
const { requireAdmin } = require('../utils/controllers');

module.exports = (api, basePath) => {
  api.route(`${basePath}/role`).get(wrapAsync(Role.all));
  api.route(`${basePath}/role/changeUserRole`).post(requireAdmin(), wrapAsync(Role.changeUserRole));
};
