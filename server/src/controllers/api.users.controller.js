const bcrypt = require("bcryptjs");
const Joi = require("joi");
const db = require(".././db/connection");
const users = db.get("users");
const schema = require("../api/api.users.schema");

const list = async (req, res, next) => {
	try {
		const result = await users.find({}, "-password");
		res.json(result);
	} catch (error) {
		next(error);
	}
};

const updateOne = async (req, res, next) => {
	// validate req.body
	// find a user with given id
	// update user

	const { id: _id } = req.params;
	try {
		const result = Joi.validate(req.body, schema);
		if (!result.error) {
			const query = { _id };
			const user = await users.findOne(query);

			if (user) {
				const updatedUser = req.body;
				// check if contains new password
				if (updatedUser.password) {
					updatedUser.password = await bcrypt.hash(updatedUser.password, 12);
				}

				const result = await users.findOneAdUpdate(query, {
					$set: updatedUser
				});
				delete result.password;
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
	updateOne
};
