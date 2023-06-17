const db = require('../config/config');
const Sequelize = require('sequelize');
const user = require('./user.model');
const blog = require('./blog.model');

const comments = db.define('comments',
    {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        user_id: { type: Sequelize.INTEGER, allowNull: false },
        blog_id: { type: Sequelize.INTEGER, allowNull: false },
        description: { type: Sequelize.STRING, allowNull: false },
    }, { timestamps: false }
);

module.exports = comments;