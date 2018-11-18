const User = require('../controllers/user');
const { wrapAsync } = require('../utils/controllers');

module.exports = (api, basePath) => {
  api.route(`${basePath}/sensorData/:vin`).get(wrapAsync(User.getAll));
};
