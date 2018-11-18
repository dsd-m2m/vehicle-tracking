module.exports = (sequelize, DataTypes) => {

    var user = sequelize.define('user', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        email: DataTypes.STRING,
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'role',
                key: 'id'
            }
        },
        username: DataTypes.STRING,
        pic: DataTypes.STRING
    }, { 'freezeTableName': true });
    return user;
};
