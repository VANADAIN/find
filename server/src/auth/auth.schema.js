const Joi = require("joi");

const schema = Joi.object().keys({
	username: Joi.string()
		.trim()
		.regex(/(^[a-zA-Z0-9_]*$)/)
		.min(3)
		.max(30)
		.required(),
	email: Joi.string()
		.trim()
		.email(),
	password: Joi.string()
		.trim()
		.min(8)
		.required()
});

module.exports = schema;
