const express = require("express");
const router = express.Router();

const controller = require("./auth.controller");
const middlewares = require("./auth.middlewares");

// Any route here is with /auth --

router.get("/", controller.get);

router.post("/signup", middlewares.validateUser(), controller.signup);

router.post(
	"/login",
	middlewares.validateUser("Unable to login."),
	controller.login
);

module.exports = router;
