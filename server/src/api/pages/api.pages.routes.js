const express = require("express");
const router = express.Router();

const controller = require("../.././controllers/api.pages.controller");
const middlewares = require("./api.middlewares");

router.get("/", controller.get);
router.post("/", controller.post);

module.exports = router;
