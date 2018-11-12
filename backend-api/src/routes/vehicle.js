const Vehicle = require('../controllers/vehicle');
const { wrapAsync } = require('../utils/controllers');
const { requireCarSubscription } = require('../utils/controllers');

module.exports = (api, base_path) => {
    api.route(base_path + '/vehicle/subscribe').post(wrapAsync(Vehicle.subscribe));
    api.route(base_path + '/vehicle/unsubscribe').post(requireCarSubscription(), wrapAsync(Vehicle.unsubscribe));
    api.route(base_path + '/vehicle/setCarState').post(requireCarSubscription(), wrapAsync(Vehicle.setCarState));
    api.route(base_path + '/vehicle/setHeatingState').post(requireCarSubscription(), wrapAsync(Vehicle.setHeatingState));
};