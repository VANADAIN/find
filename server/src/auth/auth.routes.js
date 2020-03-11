const express = require("express");
const router = express.Router();

const controller = require(".././controllers/auth.controller");
const middlewares = require("./auth.middlewares");

// Any route here is with /auth --

const defaultLoginError = "Unable to login.";

router.get("/", controller.get);

router.post(
	"/signup",
	middlewares.validateUser(),
	middlewares.findUser(),
	controller.signup
);

router.post(
	"/login",
	middlewares.validateUser(defaultLoginError),
	middlewares.loginValidate(
		defaultLoginError,
		// next string becomes isError
		user => !(user && user.active)
	),
	controller.login
);

module.exports = router;
