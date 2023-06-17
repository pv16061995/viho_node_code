
const schema = require("../model/webhook.model");


const saveWebhook = async (obj) => {
    const data = new schema(obj);
    return await data.save();
}

const updateWebhook = async (data, condition) => {
    return await schema.update(data, { where: condition });
}

module.exports = { saveWebhook, updateWebhook };