const JOI = require('joi');

function addComment(body) {
    const schema = JOI.object({
        "blog_id": JOI.number().required(),
        "description": JOI.string().required()
    });
    return schema.validate(body);
}


module.exports = { addComment }