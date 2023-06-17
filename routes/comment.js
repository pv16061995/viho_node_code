const express = require('express');
const controller = require('../controller/comment');
const validator = require('../validator/comment');
const router = express.Router();
const responseHandler = require("../lib/responseHandler");

router.post("/", async (req, res) => {
    try {
        const { error: validationError } = validator.addComment(req.body);
        if (validationError) {
            return res.status(400).json(responseHandler("", validationError));
        }

        let responseBody = await controller.saveComment(req);
        return res.status(200).json(responseHandler(responseBody, "Data has been storing successfully!!!"));
    } catch (error) {
        let { httpCode, responseBody } = error;
        if (httpCode) {
            return res.status(httpCode).json(responseBody);
        }
        return res.status(400).json(responseHandler("", error.message));
    }
});


module.exports = router;