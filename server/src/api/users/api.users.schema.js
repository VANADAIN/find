const Joi = require("joi");

const schema = Joi.object().keys({
	id: Joi.string(),
	username: Joi.string()
		.trim()
		.regex(/(^[a-zA-Z0-9_]*$)/)
		.min(3)
		.max(30),
	email: Joi.string()
		.trim()
		.email(),
	role: Joi.string().valid("user", "admin"),
	active: Joi.bool()
});

module.exports = schema;
