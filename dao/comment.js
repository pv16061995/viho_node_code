const sequelize = require("sequelize");
const commentSchema = require("../model/comment.model");
const db = require('../config/config');


const saveComment = async (obj) => {
  const comment = new commentSchema(obj);
  return comment.save();
}

const getCommentByBlogId = async (id) => {
  return commentSchema.findAll({ where: { blog_id: id } });
}

module.exports = { saveComment, getCommentByBlogId };