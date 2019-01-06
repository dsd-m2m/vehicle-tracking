const SensorData = require('../controllers/sensorData');
const { wrapAsync } = require('../utils/controllers');
const { requireAdmin, requireAdminOrCarSubscription } = require('../utils/controllers');

module.exports = (api, basePath) => {
  api.route(`${basePath}/sensorData/:vin`).get(requireAdminOrCarSubscription(), wrapAsync(SensorData.get));
  api.route(`${basePath}/sensorData/:vin/export`).get(requireAdminOrCarSubscription(), wrapAsync(SensorData.exportCsv));
  api.route(`${basePath}/sensorData`).get(requireAdmin(), wrapAsync(SensorData.all));
};