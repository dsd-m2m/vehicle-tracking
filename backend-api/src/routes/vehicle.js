const Vehicle = require('../controllers/vehicle');
const { wrapAsync } = require('../utils/controllers');
const { requireCarSubscription } = require('../utils/controllers');

module.exports = (api, basePath) => {
  api.route(`${basePath}/vehicle`).get(wrapAsync(Vehicle.get));
  api.route(`${basePath}/vehicle/subscribe`).post(wrapAsync(Vehicle.subscribe));
  api.route(`${basePath}/vehicle/unsubscribe`).post(requireCarSubscription(), wrapAsync(Vehicle.unsubscribe));
  api.route(`${basePath}/vehicle/command`).post(requireCarSubscription(), wrapAsync(Vehicle.command));
};
