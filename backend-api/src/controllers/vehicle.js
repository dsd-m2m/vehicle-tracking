const AWS = require('aws-sdk');
const Vehicle = require('../models/user').vehicle;
const VehicleStateEnum = require('../utils/enums/vehicleStates');
const ValidationUtil = require('../utils/validation');

// DOCS: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/IotData.html
const iotData = new AWS.IotData({ endpoint: process.env.IOT_ENDPOINT });

const get = async (req, res) => {
    const { vin } = req.params;
    if (!vin) {
        return res.status(400).json({ message: 'Undefined vehicle id' });
    }
    const vehicle = await Vehicle
        .findOne({ where: { vin } }).catch(() => {
            throw Error('SequelizeError');
        });

    if (!vehicle) {
        return res.status(400).json({ message: 'Vehicle is not registered in the system' });
    }

    return res.status(200).json(vehicle);
};

const all = async (req, res) => {

    const vehicles = await Vehicle
        .findAll().catch(() => {
            throw Error('SequelizeError');
        });

    return res.status(200).json(vehicles);
};

const create = async (req, res) => {
    const { vin, model, manufacturer, manufactureYear } = req.body
    const vehicle = await Vehicle
        .create(
            {
                vin,
                model,
                manufacturer,
                manufactureYear
            }).catch(() => {
                throw Error('SequelizeError');
            });
    return res.status(200).json(vehicle);

}

const update = async (req, res) => {
    const { vin } = req.params;
    const { model, manufacturer, manufactureYear } = req.body
    if (!vin) {
        return res.status(400).json({ message: 'Undefined vehicle id' });
    }

    await Vehicle
        .update(
            {
                model,
                manufacturer,
                manufactureYear
            },
            { where: { vin } }
        ).catch(() => {
            throw Error('SequelizeError');
        });
    return res.status(200).json({ message: 'Vehicle successfully updated' });
};

const remove = async (req, res) => {
    const { vin } = req.params;
    if (!vin) {
        return res.status(400).json({ message: 'Undefined vehicle id' });
    }

    const vehicle = await Vehicle
        .destroy({
            where: {
                vin
            },
        }).catch(() => {
            throw Error('SequelizeError');
        });

    if (!vehicle) {
        return res.status(400).json({ message: 'Vehicle is not registered in the system' });
    }
    return res.status(200).json({ message: 'Vehicle is successfully deleted' });
}


const readCommand = async (req, res) => {
    const thingName = req.params.vin;
    return iotData.getThingShadow({ thingName}, (err, data) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        return res.status(200).json(JSON.parse(data.payload).state.reported);
    });
};

const writeCommand = async (req, res) => {
    const thingName = req.params.vin;
    const desired = req.body;
    const desiredKeys = Object.keys(desired);

    if (desiredKeys.length === 0) {
        return res.status(400).json({ message: "Empty command parameters" });
    }

    for (let i = 0; i < Object.keys(desired).length; i += 1) {
        if (!(desiredKeys[i] in VehicleStateEnum)) {
            return res.status(400).json({ message: `Invalid parametar name {${desiredKeys[i]}}` });
        }
        if (!ValidationUtil.isBoolean(desired[desiredKeys[i]])) {
            return res.status(400).json({ message: `Invalid parametar value for key {${desiredKeys[i]}}, only boolean values are allowed` });
        }
    }

    const newState = {
        state: {
            desired
        }
    };

    return iotData.updateThingShadow(
        {
            thingName,
            payload: JSON.stringify(newState),
        },
        (err) => {
            if (err) {
                res.status(400).json({ message: err });
            }
            res.status(200).json({ message: "Command is successfully delivered" });
        },
    );
};

module.exports = { get, all, create, update, remove, readCommand, writeCommand };