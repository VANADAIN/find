const jwt = require("jsonwebtoken");
const Joi = require("joi");

const schema = require("./auth.schema");
const users = require("./auth.model");

function checkTokenSetUser(req, res, next) {
	const authHeader = req.get("authorization");

	if (authHeader) {
		const token = authHeader.split(" ")[1];

		if (token) {
			jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
				if (error) {
					console.log(error);
				}

				req.user = user;
				next();
			});
		} else {
			next();
		}
	} else {
		next();
	}
}

function isLoggedIn(req, res, next) {
	if (req.user) {
		next();
	} else {
		unAuthorized(res, next);
	}
}

function unAuthorized(res, next) {
	const error = new Error("UnAuthorized");
	res.status(401);
	next(error);
}

function isAdmin(req, res, next) {
	if (req.user.role === "admin") {
		next();
	} else {
		unAuthorized(res, next);
	}
}

const validateUser = (defaultErrorMessage = "") => (req, res, next) => {
	const result = Joi.validate(req.body, schema);
	if (!result.error) {
		next();
	} else {
		const error = defaultErrorMessage
			? new Error(defaultErrorMessage)
			: result.error;
		res.status(422);
		next(error);
	}
};

const findUser = () => async (req, res, next) => {
	const user = await users.findOne({
		username: req.body.username
	});
	if (user) {
		res.status(409);
		next(new Error("Username is already taken"));
	} else {
		const email = await users.findOne({
			email: req.body.email
		});
		if (email) {
			res.status(409);
			next(new Error("User with this email already exist"));
		} else {
			// comes to brypt compare
			req.loggingInUser = user;
			next();
		}
	}
};

const loginValidate = (defaultLoginError, isError, errorCode = 422) => async (
	req,
	res,
	next
) => {
	const user = await users.findOne({
		username: req.body.username
	});
	if (isError(user)) {
		res.status(errorCode);
		next(new Error(defaultLoginError));
	} else {
		// comes to brypt compare
		req.loggingInUser = user;
		next();
	}
};

module.exports = {
	checkTokenSetUser,
	isLoggedIn,
	isAdmin,
	validateUser,
	findUser,
	loginValidate
};
