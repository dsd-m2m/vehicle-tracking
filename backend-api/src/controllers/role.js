const User = require('../models/user').user;
const Role = require('../models/user').role;


const getAll = async (req, res) => {
  Role.findAll().then(items => res.status(200).json(items));
};

const changeUserRole = async (req, res) => {
  const { userId, newRoleId} = req.body;

  const { newRole } = await Role.findOne({ where: { id: newRoleId } });
  if (!newRole) {
    return res.status(400).json({ success: true, data: "Role doesn't exist" });
  }

  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    return res.status(400).json({ success: true, data: "User doesn't exist" });
  }

  user.roleId = newRoleId;
  await user.save({
    fields: ['roleId'],
  });

  return res.status(200).json({ success: true, data: 'User role succesfully updated' }).end();
};

module.exports.getAll = getAll;
module.exports.changeUserRole = changeUserRole;
