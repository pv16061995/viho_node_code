
const sequelize = require("sequelize");
const blogSchema = require("../model/blog.model");
const userSchema = require("../model/user.model");
const db = require('../config/config');


const saveBlog = async (obj) => {
    const blog = new blogSchema(obj);
    return await blog.save();
}

const getBlogList = async () => {
    return await blogSchema.findAll();
}
const getBlogListById = async (id) => {

    const sql = "select blog.id,blog.title,blog.description,user.name as author_name from blogs as blog left join users as user on blog.user_id = user.id where blog.id = ?";

    let values = {
        replacements: [id],
        type: sequelize.QueryTypes.SELECT
    };
    return await db.query(sql, values).catch(error => {
        throw createError(500, error.message);
    });
}

const getUserDetail = async (username, password) => {
    return await userSchema.findOne({ where: { username, password } });
}

module.exports = { saveBlog, getBlogList, getBlogListById, getUserDetail };