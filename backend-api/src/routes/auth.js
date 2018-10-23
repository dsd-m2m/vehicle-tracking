const Auth = require('../controllers/auth');
const {wrapAsync} = require('../utils/controller');

module.exports = api => {
	api.route('/auth/login').post(wrapAsync(Auth.login));
};