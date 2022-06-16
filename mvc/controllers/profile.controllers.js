const Profile = require("../model/profile");
const User = require("../model/user");

const findMe = async (req, res) => {
  const findUser = await Profile.findOne({ user: req.user.id });

  try {
    if (!findUser) {
      return res.json("User Not Found").status(401);
    }
    console.log("in");
    res.json({ findUser }).status(200);
  } catch (err) {
    if (err.kind === "ObjectId") return res.json("Eror").status(500);
  }
};

const updateProfile = async (req, res) => {
  const { address, skills, name } = req.body;
  const profileFeilds = {};
  if (req.user.id) profileFeilds.user = req.user.id;
  if (address) profileFeilds.address = address;
  if (skills) profileFeilds.skills = skills.split(",").map((e) => e.trim());
  profileFeilds.social = {};
  profileFeilds.social.twitter = req.body.twitter;
  profileFeilds.social.facebook = req.body.facebook;
  profileFeilds.social.linkedin = req.body.linkedin;

  let findUser = await Profile.findOne({ user: req.user.id })
    .populate("user")
    .exec();
  if (findUser) {
    findUser = await Profile.findOneAndUpdate(
      { user: req.user.id },
      {
        $set: profileFeilds,
      },
      { new: true }
    );
    return res.json(findUser).status(200);
  }
  findUser = await new Profile(profileFeilds);
  await findUser.save();
  res.json(findUser).status(200);
};

const allProfiles = async function (req, res) {
  try {
    const allUser = await Profile.find().populate("user", ["name", "avatar"]);
    if (!allUser) {
      return res.json("Not User Found").status(404);
    }
    res.json(allUser).status(200);
  } catch (e) {
    console.log(e);
  }
};

const selectOne = async function (req, res) {
  try {
    const { id } = req.params;
    const findOne = await Profile.findOne({ user: id }).populate("user", [
      "name",
      "avatar",
    ]);
    if (!findOne) {
      return res.json("Not User Found").status(404);
    }
    res.json(findOne).status(200);
  } catch (e) {
    console.log(e);
  }
};

const deleteOne = async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.json("User Delted").status(200);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  findMe,
  updateProfile,
  allProfiles,
  selectOne,
  deleteOne,
};
