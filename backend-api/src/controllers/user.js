const db = require('../models/user/index')
const User = require('../models/user').user;

const get = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Undefined user id' });
  }

  return db.sequelize.query(
    `${'(SELECT * , ' +
    '(SELECT CONCAT("[", group_concat(DISTINCT vin ORDER BY vin SEPARATOR ","),"]")'
    + 'FROM `user_vehicle`'
    + 'WHERE `user_vehicle`.`userId` = `u`.`id`)'
    + 'AS `vehicles` FROM `user` AS `u` WHERE `u`.`id` = '}${
    String(id)})`,
    { type: db.sequelize.QueryTypes.SELECT }
  ).then(items => res.status(200).json(items));
};

const all = async (req, res) => {
  db.sequelize.query(
    '(SELECT * , ' +
    '(SELECT CONCAT("[", group_concat(DISTINCT vin ORDER BY vin SEPARATOR ","),"]")'
    + 'FROM `user_vehicle`'
    + 'WHERE `user_vehicle`.`userId` = `u`.`id`)'
    + 'AS `vehicles` FROM `user` AS `u`)',
    { type: db.sequelize.QueryTypes.SELECT }
  ).then(items => res.status(200).json(items));
};

const remove = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Undefined user id' });
  }

  const user = await User
    .destroy({
      where: {
        id
      },
    }).catch(() => {
      throw Error('SequelizeError');
    });

  if (!user) {
    return res.status(400).json({ message: 'User is not registered in the system' });
  }
  return res.status(200).json({ message: 'User is successfully deleted' });
}

module.exports = { get, all, remove };