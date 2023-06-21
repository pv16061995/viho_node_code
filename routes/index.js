
var express = require('express');
var router = express.Router();
const webhook = require("./webhook");
const fileUpload = require('./fileUpload');
// const blog = require("./blog");
// const comment = require("./comment");
// const auth = require("../lib/auth");


const CONST_URL = "/api/v1/";
// router.use(auth.checkUser);
// router.use(CONST_URL + "blog", blog);
// router.use(CONST_URL + "comment", comment);
router.use('/',fileUpload);
router.use(CONST_URL + "webhook", webhook);



module.exports = router;