const Joi = require("joi");

const db = require(".././db/connection");
const users = db.get("users");
const schema = require("../api/users/api.users.schema");

const list = async (req, res, next) => {
	try {
		const result = await users.find({}, "-password");
		res.json(result);
	} catch (error) {
		next(error);
	}
};

const findOne = async (req, res, next) => {
	const search_username = req.body.search_username;
	try {
		const query = { username: search_username };

		const user = await users.findOne(query);

		if (user) {
			res.json(user);
		} else {
			res.status(404);
			const err = Error("User not found");
			next(err);
		}
	} catch (error) {
		res.status(500);
		next(error);
	}
};

const updateOne = async (req, res, next) => {
	// validate req.body
	// find a user with given id
	// update user
	try {
		const result = Joi.validate(req.body, schema);

		if (!result.error) {
			const query = { _id: req.body.id };
			const user = await users.findOne(query);
			delete req.body.id;
			console.log(req.body);
			if (user) {
				const updatedUser = req.body;

				const result = await users.findOneAndUpdate(query, {
					$set: updatedUser
				});

				res.json(result);
			} else {
				next();
			}
		} else {
			res.status(422);
			throw new Error(result.error);
		}
	} catch (error) {
		next(error);
	}
};

module.exports = {
	list,
	updateOne,
	findOne
};
