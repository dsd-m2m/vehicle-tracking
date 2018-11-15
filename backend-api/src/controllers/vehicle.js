const Vehicle = require('../models/user').vehicle;
const UserSubscription = require('../models/user').userSubscription;

const subscribe = async (req, res) => {
    vehicleUID = req.body.vehicleUID;

    if (!vehicleUID) {
        return res.status(400).json({ success: false, data: "Invalid vehicle UID" });
    }
    userId = req.user.sub;
    [vehicle, created] = await Vehicle
        .findOrCreate({
            where: {
                vehicleUID: vehicleUID
            },
            defaults: {
                vehicleUID: vehicleUID
            }
        }).catch(err => {
            throw Error("SequelizeError");
        });

    [userSubscription, created] = await UserSubscription
        .findOrCreate({
            where: {
                userId: userId,
                vehicleId: vehicle.id
            },
            defaults: {
                userId: userId,
                vehicleId: vehicle.id,
                creationDate: new Date()
            }
        }).catch(err => {
            throw Error("SequelizeError");
        })

    res.status(200).json({ success: true, data: "User is successfully subscribed to the vehicle" });

};

const unsubscribe = async (req, res) => {
    vehicleId = req.body.vehicleId;
    userId = req.user.sub;
    if (!vehicleId) {
        return res.status(400).json({ success: false, data: "Invalid vehicle id" });
    }
    const vehicle = await Vehicle
        .findOne({
            where: {
                id: vehicleId
            }
        }).catch(err => {
            throw Error("SequelizeError");
        });

    if (!vehicle) {
        return res.status(200).json({
            success: false, data: "Invalid vehicle id"
        });
    }
    userSubscription = await UserSubscription
        .destroy({
            where: {
                userId: userId,
                vehicleId: vehicle.id
            }
        }).catch(err => {
            throw Error("SequelizeError");
        })
    if (!userSubscription) {
        return res.status(200).json({ success: false, data: "User is not subscribed to this vehicle" });

    }
    res.status(200).json({ success: true, data: "User is successfully unsubscribed from the vehicle" });
};

// TO DO
const setHeatingState = async (req, res) => {
    newState = req.body.newState;
    res.status(200).json({ success: true });
};

// TO DO
const setCarState = async (req, res) => {
    newState = req.body.newState;
    res.status(200).json({ success: true });
};

module.exports.unsubscribe = unsubscribe;
module.exports.subscribe = subscribe;
module.exports.setHeatingState = setHeatingState;
module.exports.setCarState = setCarState;