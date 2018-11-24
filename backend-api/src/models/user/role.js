
module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define('role', {
    id: {
      type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false, allowNull: false,
    },
    roleName: DataTypes.STRING,
  }, { freezeTableName: true, timestamps: false });
  return role;
};
