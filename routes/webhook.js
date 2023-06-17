const express = require('express');
const controller = require('../controller/webhook');
const router = express.Router();
const responseHandler = require("../lib/responseHandler");

router.post("/tracking", async (req, res) => {
    try {
        let responseBody = await controller.saveTrackingWebhook(req);
        return res.status(200).json(responseHandler(responseBody, "Data has been getting successfully!!!"));
    } catch (error) {
        let { httpCode, responseBody } = error;
        if (httpCode) {
            return res.status(httpCode).json(responseBody);
        }
        return res.status(400).json(responseHandler("", error.message));
    }
});

router.post("/test", async (req, res) => {
    try {
        let responseBody = await controller.saveWebhook(req);
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