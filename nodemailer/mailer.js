const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");

module.exports = (userEmail, userName) => {
  let nodemailerInit = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.sender_email,
      pass: process.env.sender_password,
    },
  });
  const handlebars = {
    viewEngine: {
      partialsDir: path.join(__dirname + "/../" + "/views/"),
      defaultLayout: false,
    },
    viewPath: path.join(__dirname + "/../" + "/views/"),
  };

  nodemailerInit.use("compile", hbs(handlebars));

  let mailOption = {
    form: process.env.sender_email,
    to: userEmail,
    subject: "Welcome to Team",
    template: "email",
    context: {
      name: userName,
      company: "Invozone",
    },
    attachments: [
      {
        filename: "mail.gif",
        path:
          path.join(__dirname + "/.." + "/public" + "/assets") + "/mail.gif",
      },
    ],
  };
  nodemailerInit.sendMail(mailOption, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: " + info.response);
  });
};
