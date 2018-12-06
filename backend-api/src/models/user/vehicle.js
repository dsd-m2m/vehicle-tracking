
module.exports = (sequelize, DataTypes) => {
    const vehicle = sequelize.define('vehicle', {
        vin: {
            type: DataTypes.STRING, primaryKey: true, allowNull: false,
        },
        model: DataTypes.STRING,
        manufacturer: DataTypes.STRING,
        manufactureYear: DataTypes.INTEGER
    }, { freezeTableName: true });
    return vehicle;
};
