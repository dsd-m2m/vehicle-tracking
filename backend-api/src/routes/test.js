const Test = require('../controllers/test');
const {wrapAsync} = require('../utils/controllers');

module.exports = (api, base_path) => {
    api.route(base_path + '/ping/public').get(wrapAsync(Test.pingPublic));
    api.route(base_path + '/ping/secure').get(wrapAsync(Test.pingSecure));
};