/* eslint-disable consistent-return */
const _ = require('lodash');
const moment = require('moment');
const SensorData = require('../models/sensor/sensorData');

const all = async (req, res, next) => {
  const { vin } = req.params;

  if (!vin) {
    return res.status(400).json({ message: 'Undefined vehicle id' });
  }
  const start = parseInt(req.query.start, 10) || 0;
  const end = parseInt(req.query.end, 10) || moment().valueOf();

  SensorData
    .query(vin)
    .where('timestamp').between(start, end)
    .exec((err, resp) => {
      if (err) {
        return next();
      }
      return res.status(200).json(_.map(resp.Items, 'attrs'))
    });
};

module.exports = { all };
