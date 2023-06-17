const db = require('../config/config');
const Sequelize = require('sequelize');

const blogs = db.define('campaign_trackings',
    {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        shorturl: { type: Sequelize.STRING, defaultValue: "" },
        campaign_id: { type: Sequelize.INTEGER, defaultValue: "" },
        mobile: { type: Sequelize.STRING, defaultValue: "" },
        url: { type: Sequelize.STRING, defaultValue: "" },
        title: { type: Sequelize.STRING, defaultValue: "" },
        timestamp: { type: Sequelize.STRING, defaultValue: "" },
        ip: { type: Sequelize.STRING, defaultValue: "" },
        clicks: { type: Sequelize.INTEGER, defaultValue: "" },
        country: { type: Sequelize.STRING, defaultValue: "" },
        regionName: { type: Sequelize.STRING, defaultValue: "" },
        city: { type: Sequelize.STRING, defaultValue: "" },
        district: { type: Sequelize.STRING, defaultValue: "" },
        zip: { type: Sequelize.STRING, defaultValue: "" },
        lat: { type: Sequelize.STRING, defaultValue: "" },
        lon: { type: Sequelize.STRING, defaultValue: "" },
        currency: { type: Sequelize.STRING, defaultValue: "" },
        timezone: { type: Sequelize.STRING, defaultValue: "" },
    }, { timestamps: false }
);

module.exports = blogs;