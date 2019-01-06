
module.exports = (sequelize, DataTypes) => {
  const userVehicle = sequelize.define('user_vehicle', {
    id: {
      type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    vin: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'vehicle',
        key: 'vin',
      }
    }
  }, { freezeTableName: true });
  return userVehicle;
};
