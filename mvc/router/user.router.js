const express = require("express");
const { Auth } = require("../controllers/auth.controllers");
const { createUser, getAllUser } = require("../controllers/user.controllers");
const router = express.Router();
const auth = require("../../middlewares/auth");

router.post("/create", createUser);
router.get("/all", getAllUser);
router.post("/auth", auth, Auth);

module.exports = router;
