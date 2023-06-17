const express = require('express');
const controller = require('../controller/blog');
const commentController = require('../controller/comment');
const validator = require('../validator/blog');
const router = express.Router();
const responseHandler = require("../lib/responseHandler");

router.get("/:id", async (req, res) => {
    try {
        const { error: validationError } = validator.getBlog(req.params);
        if (validationError) {
            res.status(400);
            return res.json(responseHandler("", validationError));
        }
        let response = {};
        let responseBody = await controller.getBlogListById(req.params.id);
        if (responseBody && responseBody[0]) {
            response = responseBody[0];
            response["comments"] = await commentController.getAllCommentByBlogId(response["id"]);
        }
        return res.status(200).json(responseHandler(response, "Data has been getting successfully!!!"));
    } catch (error) {
        let { httpCode, responseBody } = error;
        if (httpCode) {
            return res.status(httpCode).json(responseBody);
        }
        return res.status(400).json(responseHandler("", error.message));
    }
});

router.get("/", async (req, res) => {
    try {
        let responseBody = await controller.getBlogList();

        return res.status(200).json(responseHandler(responseBody, "Data has been getting successfully!!!"));
    } catch (error) {
        let { httpCode, responseBody } = error;
        if (httpCode) {
            return res.status(httpCode).json(responseBody);
        }
        return res.status(400).json(responseHandler("", error.message));
    }
});


router.post("/", async (req, res) => {
    try {
        const { error: validationError } = validator.addBlog(req.body);
        if (validationError) {
            res.status(400);
            return res.json(responseHandler("", validationError));
        }

        let responseBody = await controller.saveBlog(req);
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