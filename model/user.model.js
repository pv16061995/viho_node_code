const db = require('../config/config');
const Sequelize = require('sequelize');
const users = db.define('users',
    {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: Sequelize.STRING, allowNull: false },
        email: { type: Sequelize.STRING, allowNull: false, isEmail: true },
        username: { type: Sequelize.STRING, allowNull: false },
        password: { type: Sequelize.STRING, allowNull: false },
    }, { timestamps: false }
);

module.exports = users;