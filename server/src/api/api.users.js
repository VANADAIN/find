const express = require("express");
const controller = require("../controllers/api.users.controller");

const router = express.Router();

router.get("/", controller.list);

router.patch("/:id", controller.updateOne);

module.exports = router;