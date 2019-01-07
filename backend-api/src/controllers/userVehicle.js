/* eslint-disable object-shorthand */
// const AWS = require('aws-sdk');
// const _ = require('lodash');
const UserVehicle = require('../models/user').user_vehicle;
const Vehicle = require('../models/user').vehicle;

const subscribe = async (req, res) => {
  const { vin } = req.params;
  const userId = req.user.sub;

  if (!vin) {
    return res.status(400).json({ message: 'Undefined vehicle identifer' });
  }
  const vehicle = await Vehicle
    .findOne({ where: { vin } }).catch(() => {
      throw Error('SequelizeError');
    });

  if (!vehicle) {
    return res.status(400).json({ message: 'Vehicle is not registered in the system' });
  }
  await UserVehicle
    .findOrCreate({
      where: {
        userId,
        vin,
      },
      defaults: {
        userId: userId,
        vin: vin
      },
    }).catch((err) => {
      throw Error(err);
    });

  return res.status(200).json(vehicle);
};

const unsubscribe = async (req, res) => {
  const { vin } = req.params;
  const userId = req.user.sub;

  if (!vin) {
    return res.status(400).json({ message: 'Undefined vehicle identifer' });
  }

  const vehicle = await Vehicle
    .findOne({ where: { vin } }).catch(() => {
      throw Error('SequelizeError');
    });

  if (!vehicle) {
    return res.status(400).json({ message: 'Vehicle is not registered in the system' });
  }
  const userVehicle = await UserVehicle
    .destroy({
      where: {
        userId,
        vin,
      },
    }).catch(() => {
      throw Error('SequelizeError');
    });

  if (!userVehicle) {
    return res.status(400).json({ message: 'User is not subscribed to this vehicle' });
  }
  return res.status(200).json({ message: 'User is successfully unsubscribed from the vehicle' });
};

/* // lists all registered things in AWS Iot
const get = async (req, res, next) => {

  const iot = new AWS.Iot();
  iot.listThings((err, data) => {
    if (err) {
      return next(err);
    }
    const resp = _.map(data.things, 'thingName') || [];
    return res.status(200).json(resp);
  });
}; */

module.exports = { unsubscribe, subscribe };