module.exports = (sequelize, DataTypes) => {

    var user = sequelize.define('user', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        email: DataTypes.STRING,
        roleId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'role',
                key: 'id'
            }
        },
        username: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        creationDate: DataTypes.DATE
    }, { 'freezeTableName': true, 'timestamps': false });
    return user;
};
