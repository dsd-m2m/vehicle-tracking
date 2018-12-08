const SensorData = require('../controllers/sensorData');
const { wrapAsync } = require('../utils/controllers');

module.exports = (api, basePath) => {
  api.route(`${basePath}/sensorData/:vin`).get(wrapAsync(SensorData.all));
};