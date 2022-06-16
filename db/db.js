const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(process.env.dbKey);
    console.log("Db Connect");
  } catch (err) {
    console.log("Not Connceted");
  }
};
