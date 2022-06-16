const User = require("../model/user");
const Post = require("../model/post");

const createPost = async (req, res) => {
  try {
    const findUser = await User.findById(req.user.id).select("-password");
    if (!findUser) {
      return res.json("User Not Authenticated").status(400);
    }
    const newPost = new Post({
      name: findUser.name,
      avatar: findUser.avatar,
      text: req.body.text,
      user: findUser.id,
    });
    await newPost.save();
    res.json(newPost).status(200);
  } catch (e) {
    if (e.kind === "ObjectId") return res.json("Not Post Found").status(404);
    console.log(e);
  }
};

const getAll = async (req, res) => {
  try {
    const allPost = await Post.find();
    if (!allPost) {
      return res.json("Not Post Found").status(404);
    }
    res.json(allPost);
  } catch (e) {
    if (e.kind === "ObjectId") return res.json("Not Post Found").status(404);
    console.log("Error");
  }
};
const findPost = async (req, res) => {
  try {
    const { id } = req.params;
    const SinglePost = await Post.findById(id);
    if (!SinglePost) {
      return res.json("Not Post Found").status(404);
    }
    res.json(SinglePost);
  } catch (e) {
    if (e.kind === "ObjectId") return res.json("Not Post Found").status(404);
    console.log("Error");
  }
};
const deltePost = async (req, res) => {
  try {
    const { id } = req.params;

    const SinglePost = await Post.findById(id);

    if (!SinglePost) {
      return res.json("Not Post Found").status(404);
    }
    if (SinglePost.user.toString() !== req.user.id) {
      return res.json("Not Authenicate").status(404);
    }
    await SinglePost.remove();
    res.json("Post Delte").status(200);
  } catch (e) {
    if (e.kind === "ObjectId") return res.json("Not Post Found").status(404);
    res.send("Eror");
    console.log("Error");
  }
};

const likes = async (req, res) => {
  const { id } = req.params;
  const findPost = await Post.findById(id);
  if (!findPost) {
    return res.json("Post not Exists").status(404);
  }
  if (
    findPost.likes.filter((likes) => likes.user.toString() === req.user.id)
      .length > 0
  ) {
    return res.json("User Already Clicked").status(400);
  }
  findPost.likes.unshift({ user: req.user.id });
  await findPost.save();
  res.json("Post Liked");
};

const likesDelete = async (req, res) => {
  const { id } = req.params;
  const findPost = await Post.findById(id);
  if (!findPost) {
    return res.json("Post not Exists").status(404);
  }
  if (
    findPost.likes.filter((likes) => likes.user.toString() === req.user.id)
      .length === 0
  ) {
    return res.json("User dont have liked it").status(400);
  }
  const RemoveLike = findPost.likes
    .map((e) => e.user.toString())
    .indexOf(req.user.id);
  findPost.likes.splice(RemoveLike, 1);
  await findPost.save();
  res.json("Post unLiked");
};

const commentAdd = async (req, res) => {
  const { id } = req.params;
  const findUser = await User.findById(req.user.id).select("-password");
  const post = await Post.findById(id);
  if (!post) {
    res.json("post not exisit");
  }
  const comment = {
    user: findUser.id,
    text: req.body.text,
    avatar: findUser.avatar,
    name: findUser.name,
  };
  post.comments.unshift(comment);
  await post.save();
  res.json("Comment Added");
};

const delteComment = async (req, res) => {
  const { id, commentid } = req.params;
  const postFind = await Post.findById(id);
  const exisit = postFind.comments.find((e) => e.id === commentid);
  if (!exisit) {
    return res.json("No Comment Found").status(400);
  }
  if (postFind.user.toString() !== req.user.id) {
    return res.json("User Not Authenticated").status(400);
  }
  const removeItem = postFind.comments
    .map((l) => l.user.toString())
    .indexOf(req.user.id);

  postFind.comments.splice(removeItem, 1);
  await postFind.save();
  res.json("Comment Deleted");
};

module.exports = {
  createPost,
  getAll,
  deltePost,
  findPost,
  likes,
  commentAdd,
  likesDelete,
  delteComment,
};
