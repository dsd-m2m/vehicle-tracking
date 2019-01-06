const User = require('../models/user').user;
const Role = require('../models/user').role;


const all = async (req, res) => {

  const roles = await Role
    .findAll().catch(() => {
      throw Error('SequelizeError');
    });

  return res.status(200).json(roles);
};

const changeUserRole = async (req, res) => {
  const { userId, newRoleId } = req.body;
  const newRole = await Role.findOne({ where: { id: newRoleId } }).catch(() => {
    throw Error('SequelizeError');
  });

  if (!newRole) {
    return res.status(400).json({ message: "Role doesn't exist" });
  }

  const user = await User.findOne({ where: { id: userId } }).catch(() => {
    throw Error('SequelizeError');
  });
  if (!user) {
    return res.status(400).json({ message: "User is not registered in the system" });
  }

  user.roleId = newRoleId;
  await user.save({
    fields: ['roleId'],
  }).catch(() => {
    throw Error('SequelizeError');
  });

  return res.status(200).json({ message: 'User role succesfully updated' });
};

module.exports = { all, changeUserRole };