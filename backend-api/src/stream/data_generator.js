const _ = require('lodash');
const SensorDataModel = require('../models/sensor/sensorData');

module.exports = (io) => {
    setInterval(() => {
        if (io.engine.clientsCount > 0) {
            const testVin = '1T7HT4B27X1183680';
            SensorDataModel
                .query(testVin)
                .descending()
                .limit(1)
                .exec((err, resp) => {
                    if (err) {
                        return console.log(err);
                    }
                    const tcuData = _.map(resp.Items, 'attrs');
                    return io.emit(testVin, tcuData);
                });
        }
    }, 1000);
};