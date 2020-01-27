const Joi = require("joi");

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

module.exports = {
	validateUser
};
