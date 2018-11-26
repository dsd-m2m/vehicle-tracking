const db = require('../models/user/index')

const getById = async (req, res) => {
  const { userId } = req.params;
  db.sequelize.query(
    `${'(SELECT * , ' +
        '(SELECT CONCAT("[", group_concat(DISTINCT vin ORDER BY vin SEPARATOR ","),"]")'
        + 'FROM `user_vehicle`'
        + 'WHERE `user_vehicle`.`userId` = `u`.`id`)'
    + 'AS `vehicles` FROM `user` AS `u` WHERE `u`.`id` = '}${ 
     String(userId)  })`,
    { type: db.sequelize.QueryTypes.SELECT }
  ).then(items => res.status(200).json(items));
};

const getAll = async (req, res) => {
  db.sequelize.query(
    '(SELECT * , ' +
        '(SELECT CONCAT("[", group_concat(DISTINCT vin ORDER BY vin SEPARATOR ","),"]")'
        + 'FROM `user_vehicle`'
        + 'WHERE `user_vehicle`.`userId` = `u`.`id`)'
    + 'AS `vehicles` FROM `user` AS `u`)',
    { type: db.sequelize.QueryTypes.SELECT }
  ).then(items => res.status(200).json(items));
};

module.exports.getById = getById;
module.exports.getAll = getAll;
