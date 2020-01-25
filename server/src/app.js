const express = require("express");
const volleyball = require("volleyball");
const cors = require("cors");
const helmet = require("helmet");

require("dotenv").config();

const app = express();

const middlewares = require("./auth/auth.middlewares.js");

const auth = require("./auth/auth.routes");
const pages = require("./api/pages.js");
const users = require("./api/users.js");

app.use(volleyball);

app.use(
	cors({
		origin: "http://localhost:8080"
	})
);

app.use(express.json());
app.use(helmet());
app.use(middlewares.checkTokenSetUser);

app.get("/", (req, res) => {
	res.json({
		message: "Hello there!",
		user: req.user
	});
});

app.use("/auth", auth);
app.use("/api/pages", middlewares.isLoggedIn, pages);
app.use("/api/users", middlewares.isLoggedIn, middlewares.isAdmin, users);

// -- 404 --
function notFound(req, res, next) {
	res.status(404);
	const error = new Error("Not Found - " + req.originalUrl);
	next(error);
}

// -- err --
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
