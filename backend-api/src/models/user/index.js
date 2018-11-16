const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);

const env = process.env.NODE_ENV
const config = require(__dirname + '/../../config/user_db.js')[env];
var db = {};

var sequelize = new Sequelize(config.connectionString, config);

fs.readdirSync(__dirname)
	.filter(file => {
		return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
	})
	.forEach(file => {
		var model = sequelize['import'](path.join(__dirname, file));
		db[model.name] = model;
	});

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

// create tables if they don't exist
sequelize.sync().then(
	function () {
		console.log('Tables synchronized');
	},
	function (err) {
		console.log(err);
	},
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
