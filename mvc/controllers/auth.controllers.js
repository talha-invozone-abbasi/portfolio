const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const sendMail = require("../../nodemailer/mailer");
const Auth = async (req, res) => {
  try {
    const { password, email } = req.body;
    let findUser = await User.findOne({ email });
    if (!findUser) {
      return res.json("User Not Found").status(401);
    }

    const ismatch = await bcrypt.compare(password, findUser.password);
    if (!ismatch) {
      return res.json("Password Error").status(401);
    }
    const payload = {
      user: {
        id: findUser.id,
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

module.exports = {
  Auth,
};
