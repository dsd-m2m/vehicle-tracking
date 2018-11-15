const User = require('../models/user').user;


const getById = async (req, res) => {
    const userId = req.params.userId;
    User.findOne({ where: { id: userId } }).then(item => {
        res.status(200).json(item);
    });
};

const getAll = async (req, res) => {
    User.findAll().then(items => res.status(200).json(items));
};

module.exports.getById = getById;
module.exports.getAll = getAll;
