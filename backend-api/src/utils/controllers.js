const UserSubscription = require('../models/user').userSubscription;
const Vehicle = require('../models/user').vehicle;
const User = require('../models/user').user;
const RoleEnum = require('./enums/role');

function wrapAsync(fn) {
	return function wrapAsyncInner(req, res, next) {
		fn(req, res, next).catch(e => {
			next(e);
		});
	};
}

function requireAdmin() {
	return async function (req, res, next) {
		try {

			userId = req.user.sub;
			const user = await User
				.findOne({
					where: {
						id: userId
					}
				}).catch(err => {
					throw Error("SequelizeError");
				});

			if (user.roleId == RoleEnum.oem_user) {
				return next();
			}
			return res.status(403).json({ success: false, data: "Admin rights are needed" });

		} catch (err) {
			return res.status(500).json({ success: false, data: err.message });
		}
	}
}


function requireCarSubscription() {
	return async function (req, res, next) {
		try {
			userId = req.user.sub;
			vehicleId = req.body.vehicleId;

			const vehicle = await Vehicle
				.findOne({
					where: {
						id: vehicleId
					}
				}).catch(err => {
					throw Error("SequelizeError");
				});


			if (!vehicle) {
				return res.status(403).json({ success: false, data: "Vehicle is not registered in the system" });
			}

			userSubscription = await UserSubscription
				.findOne({
					where: {
						userId: userId,
						vehicleId: vehicle.id
					}
				}).catch(err => {
					throw Error("SequelizeError");
				});

			if (userSubscription) {
				next();
			} else {
				return res.status(403).json({ success: false, data: "User is not subscribed to this car" });
			}
		} catch (err) {
			return res.status(500).json({ success: false, data: err.message });
		}
	}
};

exports.wrapAsync = wrapAsync;
exports.requireCarSubscription = requireCarSubscription;
exports.requireAdmin = requireAdmin;


