const UserVehicle = require('../controllers/userVehicle');
const Vehicle = require('../controllers/vehicle');
const { wrapAsync } = require('../utils/controllers');
const { requireAdmin, requireCarSubscription } = require('../utils/controllers');

module.exports = (api, basePath) => {
  api.route(`${basePath}/vehicle/:vin`).get(wrapAsync(Vehicle.get));
  api.route(`${basePath}/vehicle`).get(requireAdmin(), wrapAsync(Vehicle.all));
  api.route(`${basePath}/vehicle`).post(requireAdmin(), wrapAsync(Vehicle.create));
  api.route(`${basePath}/vehicle/:vin`).put(requireAdmin(), wrapAsync(Vehicle.update));
  api.route(`${basePath}/vehicle/:vin`).delete(requireAdmin(), wrapAsync(Vehicle.remove));

  api.route(`${basePath}/vehicle/:vin/subscribe`).put(wrapAsync(UserVehicle.subscribe));
  api.route(`${basePath}/vehicle/:vin/unsubscribe`).put(requireCarSubscription(), wrapAsync(UserVehicle.unsubscribe));
  api.route(`${basePath}/vehicle/:vin/command`).put(requireCarSubscription(), wrapAsync(Vehicle.writeCommand));
  api.route(`${basePath}/vehicle/:vin/command`).get(requireCarSubscription(), wrapAsync(Vehicle.readCommand));

};
