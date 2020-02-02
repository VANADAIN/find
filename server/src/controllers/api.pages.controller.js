const db = require("../db/connection");

const pages = db.get("pages");

// .../api/pages
// * returns and posts pages in dashboard section

const get = async (req, res) => {
	try {
		const pages = await pages.find({
			user_id: req.user._id
		});
		res.json(pages);
	} catch (error) {
		res.status(422);
		next(error);
	}
};

const post = async (req, res, next) => {
	try {
		// insert in db
		const page = {
			...req.body,
			user_id: req.user._id
		};
		const res_page = await pages.insert(page);
		res.json(res_page);
	} catch (error) {
		res.status(res.statusCode === 200 ? 500 : res.statusCode);
		next(error);
	}
};

module.exports = {
	get,
	post
};
