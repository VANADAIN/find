const express = require("express");
const volleyball = require("volleyball");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const app = express();

//* auth part
const middlewares = require("./auth/auth.middlewares.js");
const auth = require("./auth/auth.routes");

//* api part
const pages = require("./api/pages/api.pages.routes");
const users = require("./api/users/api.users.routes");

app.use(
	cors({
		origin: "http://localhost:8080"
	})
);
app.use(volleyball);
app.use(express.json());
app.use(helmet());
app.use(middlewares.checkTokenSetUser);

//! delete this if not necessarily
app.get("/", (req, res) => {
	res.json({
		user: req.user
	});
});

app.use("/auth", auth);
app.use("/api/pages", middlewares.isLoggedIn, pages);
app.use("/api/users", middlewares.isLoggedIn, middlewares.isAdmin, users);

//* errors part
function notFound(req, res, next) {
	res.status(404);
	const error = new Error("Not Found - " + req.originalUrl);
	next(error);
}

function errorHandler(err, req, res, next) {
	res.status(res.statusCode || 500);
	res.json({
		message: err.message,
		stack: err.stack
	});
}

app.use(notFound);
app.use(errorHandler);

module.exports = app;
