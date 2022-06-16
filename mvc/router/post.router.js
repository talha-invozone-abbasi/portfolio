const express = require("express");
const {
  createPost,
  getAll,
  findPost,
  deltePost,
  likesDelete,
  likes,
  commentAdd,
  delteComment,
} = require("../controllers/Post.controllers");
const router = express.Router();
const auth = require("../../middlewares/auth");

router.post("/create", auth, createPost);
router.get("/all", getAll);
router.get("/:id", findPost);
router.delete("/del/:id", auth, deltePost);
router.post("/like/:id", auth, likes);
router.post("/unlike/:id", auth, likesDelete);
router.post("/comment/:id", auth, commentAdd);
router.post("/comment/:id/:commentid", auth, delteComment);
module.exports = router;
