const dynamo = require('dynamodb');
const Joi = require('joi');

const SensorData = dynamo.define('sensor_data', {
    hashKey: 'vin',
    schema: {
        vin: Joi.string(),
        timestamp: Joi.number(),
        MotorRpm: Joi.number(),
        altitude: Joi.number(),
        carSpeed: Joi.number(),
        createdAt: Joi.number(),
        latitude: Joi.number(),
        longitude: Joi.number(),
        powerMotorTotal: Joi.number(),
        tempOilMotor: Joi.number(),
        torqueMotor: Joi.number()
    },
    tableName: 'sensor_data'
});

module.exports = SensorData;