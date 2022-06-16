const express = require("express");

const router = express.Router();
const auth = require("../../middlewares/auth");
const {
  findMe,
  updateProfile,
  selectOne,
  allProfiles,
  deleteOne,
} = require("../controllers/profile.controllers");

router.get("/me", auth, findMe);
router.get("/all", allProfiles);
router.delete("/delete", auth, deleteOne);
router.get("/user/:id", selectOne);
router.post("/update", auth, updateProfile);

module.exports = router;
