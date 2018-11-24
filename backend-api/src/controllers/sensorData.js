const _ = require('lodash');
const moment = require('moment');
const SensorDataModel = require('../models/sensor/sensorData');

const getAll = async (req, res, next) => {

  const { vin } = req.params;
  const start = parseInt(req.query.start,10) || 0;
  const end = parseInt(req.query.end,10) || moment().valueOf();

  SensorDataModel
  .query(vin)
  .where('timestamp').between(start, end)
  .exec((err, resp) => {
    if (err){
      return next();
    }
    return res.status(200).json(_.map(resp.Items, 'attrs'))
  });
};

module.exports.getAll = getAll;
