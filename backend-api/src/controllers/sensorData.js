/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
const _ = require('lodash');
const moment = require('moment');
const json2csv = require('json2csv');
const SensorData = require('../models/sensor/sensorData').SensorData;
const SensorDataFields = require('../models/sensor/sensorData').SensorDataFields;

const get = async (req, res, next) => {
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

const exportCsv = async (req, res, next) => {
  const { vin } = req.params;
  const fields = req.query.field || SensorDataFields;

  if (!vin) {
    return res.status(400).json({ message: 'Undefined vehicle id' });
  }
  const start = parseInt(req.query.start, 10) || 0;
  const end = parseInt(req.query.end, 10) || moment().valueOf();

  const call = SensorData
    .query(vin)
    .where('timestamp').between(start, end)
    .attributes(fields);

  call.exec((err, resp) => {
    if (err) {
      return next();
    }
    const data = _.map(resp.Items, 'attrs');

    const opts = { fields };
    const csv = json2csv.parse(data, opts);

    const filename = `${vin}-${start}-${end}.csv`;
    res.setHeader('Content-disposition', `attachment; filename=${filename}`);
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csv);
  });
};

const all = async (req, res, next) => {

  const start = parseInt(req.query.start, 10) || 0;
  const end = parseInt(req.query.end, 10) || moment().valueOf();
  const fields = req.query.field || SensorDataFields;
  const call = SensorData
    .scan()
    .where('timestamp').between(start, end)
    .attributes(fields);

  call.exec((err, resp) => {
    if (err) {
      return next();
    }
    return res.status(200).json(_.map(resp.Items, 'attrs'))
  });
};

module.exports = { get, all, exportCsv };
