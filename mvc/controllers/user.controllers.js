const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const sendMail = require("../../nodemailer/mailer");
const createUser = async (req, res) => {
  try {
    const { name, password, email, phoneNumber } = req.body;
    let findUser = await User.findOne({ email });
    if (findUser) {
      return res.json("User Already There").status(401);
    }

    const avatar = gravatar.url(email, { s: "100", r: "x", d: "retro" }, true);
    const createOne = new User({
      name,
      password,
      email,
      avatar,
      phoneNumber,
    });
    const salt = await bcrypt.genSalt(10);
    createOne.password = await bcrypt.hash(password, salt);

    await createOne.save();

    const payload = {
      user: {
        id: createOne.id,
      },
    };
    jwt.sign(
      payload,
      process.env.secret,
      { expiresIn: 3600 * 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
        if (token) sendMail(createOne.email, createOne.name);
      }
    );
  } catch (e) {
    console.log("Some thing heapen in Create User Api");
  }
};

const getAllUser = async function (req, res) {
  try {
    const allUser = await User.find().select("-password");
    if (!allUser) {
      return res.json("Not User Found").status(404);
    }
    res.json(allUser).status(200);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  createUser,
  getAllUser,
};
