const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require(".././db/connection.js");

const users = db.get("users");
users.createIndex("username", { unique: true });

const createToken = (user, res, next) => {
	const payload = {
		_id: user._id,
		username: user.username,
		role: user.role,
		active: user.active
	};
	jwt.sign(
		payload,
		process.env.TOKEN_SECRET,
		{
			expiresIn: "1h"
		},
		(err, token) => {
			if (err) {
				res.status(422);
				const error = Error("Unable to login");
				next(error);
			} else {
				// login all good
				res.json({ token });
			}
		}
	);
};

const get = (req, res) => {
	res.json({
		message: "Lock"
	});
};

const signup = (req, res, next) => {
	users
		.findOne({
			username: req.body.username
		})
		.then(user => {
			// there is user -> err
			if (user) {
				const error = new Error("That username is already taken");
				res.status(409);
				next(error);
			} else {
				// hash password and register
				bcrypt.hash(req.body.password, 12).then(hashedPassword => {
					const newUser = {
						username: req.body.username,
						password: hashedPassword,
						email: req.body.email,
						role: "user",
						active: true
					};

					users.insert(newUser).then(insertedUser => {
						// delete insertedUser.password
						// res.json(insertedUser)
						createToken(insertedUser, res, next);
					});
				});
			}
		});
};

const login = (req, res, next) => {
	users
		.findOne({
			username: req.body.username
		})
		.then(user => {
			if (user && user.active) {
				// find the user, compare the
				// password to 'user' in db
				bcrypt.compare(req.body.password, user.password).then(result => {
					if (result) {
						// right password
						createToken(user, res, next);
					} else {
						respondError422(res, next);
					}
				});
			} else {
				respondError422(res, next);
			}
		});
};

function respondError422(res, next) {
	res.status(422);
	const error = new Error("Unable to login.");
	next(error);
}

module.exports = {
	get,
	signup,
	login
};
