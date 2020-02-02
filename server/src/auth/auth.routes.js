const express = require("express");
const router = express.Router();

const controller = require(".././controllers/auth.controller");
const middlewares = require("./auth.middlewares");

// Any route here is with /auth --

const defaultLoginError = "Unable to login.";
const signUpError = "That username is already taken. Choose another one.";

router.get("/", controller.get);

router.post(
	"/signup",
	middlewares.validateUser(),
	middlewares.findUser(signUpError, user => user, 409),
	controller.signup
);

router.post(
	"/login",
	middlewares.validateUser(defaultLoginError),
	middlewares.findUser(
		defaultLoginError,
		// next string becomes isError
		user => !(user && user.active)
	),
	controller.login
);

module.exports = router;
