const dao = require("../dao/blog");


const saveBlog = async (req) => {
    let user = req.user.userId;
    let reqBody = { title: req.body.title, user_id: user, description: req.body.description };

    return await dao.saveBlog(reqBody);
}
const getBlogList = async () => {
    return await dao.getBlogList();
}
const getBlogListById = async (id) => {
    return await dao.getBlogListById(id);
}

module.exports = { saveBlog, getBlogList, getBlogListById };