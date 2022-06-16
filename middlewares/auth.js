const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.json("Token Not Found").status(404);
    }
    const decoded = jwt.verify(token, process.env.secret);
    req.user = decoded.user;
    next();
  } catch (e) {
    res.json("Token Side error: " + e.message);
  }
};
