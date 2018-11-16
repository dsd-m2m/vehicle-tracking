const Auth = require('../controllers/auth');
const {wrapAsync} = require('../utils/controllers');

module.exports = (api, base_path) => {
	api.route(base_path + '/auth/login').post(wrapAsync(Auth.login));
};