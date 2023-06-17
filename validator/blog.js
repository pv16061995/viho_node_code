const JOI = require('joi');

function addBlog(body) {
    const schema = JOI.object({
        "title": JOI.string().required(),
        "description": JOI.string().required()
    });
    return schema.validate(body);
}

function getBlog(body) {
    const schema = JOI.object({
        id: JOI.number().required(),
    });
    return schema.validate(body);
}

module.exports = { addBlog, getBlog }