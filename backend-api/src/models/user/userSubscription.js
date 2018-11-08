
module.exports = (sequelize, DataTypes) => {

    var userSubscription = sequelize.define('userSubscription', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        vehicleId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'vehicle',
                key: 'id'
            }
        },
        creationDate: DataTypes.DATE
    }, { 'freezeTableName': true, 'timestamps': false });
    return userSubscription;
};
