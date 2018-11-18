const Vehicle = require('../models/user').vehicle;
const UserVehicle = require('../models/user').user_vehicle;

const subscribe = async (req, res) => {
    vin = req.body.vin;

    if (!vin) {
        return res.status(400).json({ success: false, data: "Invalid vehicle UID" });
    }
    userId = req.user.sub;

    [userVehicle, created] = await UserVehicle
        .findOrCreate({
            where: {
                userId: userId,
                vin: vin
            },
            defaults: {
                userId: userId,
                vin: vin,
                creationDate: new Date()
            }
        }).catch(err => {
            throw Error("SequelizeError");
        })

    res.status(200).json({ success: true, data: "User is successfully subscribed to the vehicle" });

};

const unsubscribe = async (req, res) => {
    vin = req.body.vin;
    userId = req.user.sub;
    if (!vin) {
        return res.status(400).json({ success: false, data: "Invalid vehicle id" });
    }

    userVehicle = await UserVehicle
        .destroy({
            where: {
                userId: userId,
                vin: vind
            }
        }).catch(err => {
            throw Error("SequelizeError");
        })
    if (!userVehicle) {
        return res.status(200).json({ success: false, data: "User is not subscribed to this vehicle" });

    }
    res.status(200).json({ success: true, data: "User is successfully unsubscribed from the vehicle" });
};

// TO DO
const command = async (req, res) => {
    commandName = req.params.commandName;
    newState = req.body.newState;
    return res.status(200).json({ success: true });
};

module.exports.unsubscribe = unsubscribe;
module.exports.subscribe = subscribe;
module.exports.command = command;