const db = require('../config/config');
const Sequelize = require('sequelize');
const user = require('./user.model');

const blogs = db.define('blogs',
    {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        title: { type: Sequelize.STRING, allowNull: false, isAlpha: true, isAlphanumeric: true, isNumeric: false },
        user_id: { type: Sequelize.INTEGER, allowNull: false, isEmail: true, references: { model: user, key: 'id' } },
        description: { type: Sequelize.STRING, allowNull: false },
    }, { timestamps: false }
);

module.exports = blogs;