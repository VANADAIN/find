const express = require("express");
const router = express.Router();

const controller = require("../.././controllers/auth.controller");
const middlewares = require("./api.middlewares");

router.get("/", controller.get);
router.post("/", controller.post);
