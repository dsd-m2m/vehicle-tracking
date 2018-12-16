/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
const _ = require('lodash');
const moment = require('moment');
const json2csv = require('json2csv');
const SensorData = require('../models/sensor/sensorData');

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
  const field = req.query.field;

  if (!vin) {
    return res.status(400).json({ message: 'Undefined vehicle id' });
  }
  const start = parseInt(req.query.start, 10) || 0;
  const end = parseInt(req.query.end, 10) || moment().valueOf();

  let call;
  if (field) {
    call = SensorData
      .query(vin)
      .where('timestamp').between(start, end)
      .attributes(field);
  } else {
    call = SensorData
      .query(vin)
      .where('timestamp').between(start, end);
  }
  call.exec((err, resp) => {
    if (err) {
      return next();
    }
    let data = _.map(resp.Items, 'attrs');

    
    const filename = `${vin}-${start}-${end}.csv`;
    if (data.length !== 0) {
      data = json2csv.parse(data);
    }else{
      data = undefined;
    }

    res.setHeader('Content-disposition', `attachment; filename=${filename}`);
    res.set('Content-Type', 'text/csv');
    res.status(200).send(data);
  });
};

const all = async (req, res, next) => {

  const start = parseInt(req.query.start, 10) || 0;
  const end = parseInt(req.query.end, 10) || moment().valueOf();
  const field = req.query.field;

  let call;
  if (field) {
    call = SensorData
      .scan()
      .where('timestamp').between(start, end)
      .attributes(field);
  } else {
    call = SensorData
      .scan()
      .where('timestamp').between(start, end);
  }
  call.exec((err, resp) => {
    if (err) {
      return next();
    }
    return res.status(200).json(_.map(resp.Items, 'attrs'))
  });
};

module.exports = { get, all, exportCsv };
