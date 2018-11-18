
module.exports = (sequelize, DataTypes) => {
  const userVehicle = sequelize.define('user_vehicle', {
    userId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    vin: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { freezeTableName: true });
  return userVehicle;
};
