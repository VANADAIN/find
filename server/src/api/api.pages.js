const express = require("express");
const Joi = require("joi");

const db = require("../db/connection");

const pages = db.get("pages");

const router = express.Router();

// .../api/pages
// * returns and posts pages in dashboard section

router.get("/", (req, res) => {
	pages
		.find({
			user_id: req.user._id
		})
		.then(pages => {
			res.json(pages);
		});
});

router.post("/", (req, res, next) => {
	const result = Joi.validate(req.body, schema);
	if (result.error === null) {
		// insert in db
		const page = {
			...req.body,
			user_id: req.user._id
		};
		pages.insert(page).then(page => {
			res.json(page);
		});
	} else {
		const error = new Error(result.error);
		res.status(422);
		next(error);
	}
});

module.exports = router;
