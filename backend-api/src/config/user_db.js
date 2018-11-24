module.exports = {
  development: {
    connectionString: process.env.DB_DEV,
    dialect: 'mysql',
    operatorsAliases: false,
    freezeTableName: true,
  },
  test: {
    connectionString: process.env.DB_TEST,
    dialect: 'mysql',
    operatorsAliases: false,
    freezeTableName: true,
  },
  production: {
    connectionString: process.env.DB_PROD,
    dialect: 'mysql',
    operatorsAliases: false,
    freezeTableName: true,
  },
};
