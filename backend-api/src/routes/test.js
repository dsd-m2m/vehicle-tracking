const Test = require('../controllers/test');
const {wrapAsync} = require('../utils/controller');

module.exports = api => {
    api.route('/ping/public').get(wrapAsync(Test.pingPublic));
    api.route('/ping/secure').get(wrapAsync(Test.pingSecure));
};