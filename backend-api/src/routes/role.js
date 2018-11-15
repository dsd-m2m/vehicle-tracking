const Role = require('../controllers/role');
const { wrapAsync } = require('../utils/controllers');
const { requireAdmin } = require('../utils/controllers');

module.exports = (api, base_path) => {
    api.route(base_path + '/role').get(wrapAsync(Role.getAll));
    api.route(base_path + '/role/changeUserRole').post(requireAdmin(), wrapAsync(Role.changeUserRole));
};