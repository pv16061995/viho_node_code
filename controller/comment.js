const dao = require("../dao/comment");

const saveComment = async (req) => {
    let user = req.user.userId;
    let reqBody = { blog_id: req.body.blog_id, user_id: user, description: req.body.description };

    return await dao.saveComment(reqBody);
}

const getAllCommentByBlogId = async (id) => {
    return await dao.getCommentByBlogId(id);
}

module.exports = { saveComment, getAllCommentByBlogId };