
module.exports = (sequelize, DataTypes) => {

    var vehicle = sequelize.define('vehicle', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        vin: DataTypes.STRING
    }, { 'freezeTableName': true, 'timestamps': false });
    return vehicle;
};
