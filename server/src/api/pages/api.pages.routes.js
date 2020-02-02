const express = require("express");
const router = express.Router();

const controller = require("../.././controllers/api.pages.controller");
const middlewares = require("./api.pages.middlewares");

router.get("/", controller.get);
router.post("/", middlewares.validatePage, controller.post);

module.exports = router;
