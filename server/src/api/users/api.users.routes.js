const express = require("express");
const router = express.Router();

const controller = require("../.././controllers/api.users.controller");

// * isAdmin condition checked in app.js
router.get("/", controller.list);
router.patch("/:id", controller.updateOne);

module.exports = router;
