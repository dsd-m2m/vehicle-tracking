module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
    },
    email: DataTypes.STRING,
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'role',
        key: 'id',
      },
    },
    username: DataTypes.STRING,
    pic: DataTypes.STRING,
  }, { freezeTableName: true });

  user.associate = models => {
    user.hasMany(models.user_vehicle)
    //user.belongsToMany(models.user_vehicle, {through: models.user_vehicle, foreignKey: "userId" })
}

  return user;
};
