const Sequelize = require('sequelize');
const db = new Sequelize('new_smpp', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    dialectModule: require('mysql2'),

});
module.exports = db;