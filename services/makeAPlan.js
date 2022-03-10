const User = require("../models/User");

exports.checkUserEmail = async (email) => {
  return await User.findOne({ email: email }).lean().exec();
};
