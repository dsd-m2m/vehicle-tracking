const Test = require('../controllers/test');
const { wrapAsync } = require('../utils/controllers');

module.exports = (api, basePath) => {
  api.route(`${basePath}/ping/public`).get(wrapAsync(Test.pingPublic));
  api.route(`${basePath}/ping/secure`).get(wrapAsync(Test.pingSecure));
};
