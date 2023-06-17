
const dao = require("../dao/blog");
const responseHandler = require('./responseHandler');
const customError = require('./customError');
const statusCode = require('./statusCode');

const checkUser = async (req, res, next) => {
    try {
        let response = await dao.getUserDetail(req.headers.username, req.headers.password);
        if (!response || !response.id) {
            throw new Error(statusCode.UNAUTHORIZED.message);
        }
        req.user = { userId: response.id };
        next();
    } catch (error) {
        let statusObj = statusCode.UNAUTHORIZED;
        res.status(statusObj.status).send(responseHandler(new customError(statusObj.message, { code: statusObj.status })));
    }
}

module.exports = { checkUser };