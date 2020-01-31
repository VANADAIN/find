const Joi = require("joi");

const schema = Joi.object().keys({
	name: Joi.string()
		.trim()
		.min(2)
		.max(30)
		.required(),
	age: Joi.number().required(),
	experience: Joi.number().required(),
	genre: Joi.string()
		.trim()
		.required(),
	main_instrument: Joi.string()
		.trim()
		.required(),
	second_instrument: Joi.string().trim(),
	public: Joi.string()
		.trim()
		.required(),
	note: Joi.string()
		.trim()
		.max(500),
	avatar_link: Joi.string()
		.trim()
		.max(1000),
	youtube: Joi.string()
		.trim()
		.max(1000)
});

module.exports = schema;
