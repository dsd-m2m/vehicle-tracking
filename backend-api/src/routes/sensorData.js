const SensorData = require('../controllers/sensorData');
const { wrapAsync } = require('../utils/controllers');
const { requireAdmin } = require('../utils/controllers');

module.exports = (api, basePath) => {
  api.route(`${basePath}/sensorData/:vin`).get(requireAdmin(), wrapAsync(SensorData.get));
  api.route(`${basePath}/sensorData`).get(requireAdmin(), wrapAsync(SensorData.all));
};