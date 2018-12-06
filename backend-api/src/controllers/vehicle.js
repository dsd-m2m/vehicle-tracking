const Vehicle = require('../models/user').vehicle;

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

module.exports = { get, all, create, update, remove };