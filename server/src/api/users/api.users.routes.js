const express = require("express");
const router = express.Router();

const controller = require("../.././controllers/api.users.controller");

// * isAdmin condition checked in app.js
router.get("/list", controller.list);
router.post("/", controller.findOne);
router.patch("/", controller.updateOne);

module.exports = router;
