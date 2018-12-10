const UserVehicle = require('../models/user').user_vehicle;
const User = require('../models/user').user;
const RoleEnum = require('./enums/role');

function wrapAsync(fn) {
  return function wrapAsyncInner(req, res, next) {
    fn(req, res, next).catch((e) => {
      next(e);
    });
  };
}

function requireAdmin() {
  return async function requireAdminInner(req, res, next) {
    try {
      const userId = req.user.sub;
      const user = await User
        .findOne({
          where: {
            id: userId,
          },
        }).catch(() => {
          throw Error('SequelizeError');
        });

      if (user.roleId === RoleEnum.oem_user) {
        return next();
      }
      return res.status(403).json({ message: 'Admin rights are needed' });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };
}


function requireCarSubscription() {
  return async function requireCarSubscriptionInner(req, res, next) {
    const userId = req.user.sub;
    const { vin } = req.params;
    if (!vin) {
      return res.status(400).json({ message: 'Invalid vehicle id' });
    }

    const userVehicle = await UserVehicle
      .findOne({
        where: {
          userId,
          vin,
        },
      }).catch(() => {
        throw Error('SequelizeError');
      });

    if (userVehicle) {
      return next();
    }
    return res.status(403).json({ message: 'User is not subscribed to this car' });
  };
}

module.exports = { wrapAsync, requireCarSubscription, requireAdmin };

