
module.exports = (sequelize, DataTypes) => {

    var userVehicle = sequelize.define('user_vehicle', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        vehicleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'vehicle',
                key: 'id'
            }
        },
        creationDate: DataTypes.DATE
    }, { 'freezeTableName': true, 'timestamps': false });
    return userVehicle;
};
