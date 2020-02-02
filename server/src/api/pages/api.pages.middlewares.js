const Joi = require("joi");
const schema = require("./api.pages.schema");

const validatePage = (req, res, next) => {
	const result = Joi.validate(req.body, schema);
	if (!result.error) {
		next();
	} else {
		const error = result.error;
		res.status(422);
		next(error);
	}
};

module.exports = {
	validatePage
};
