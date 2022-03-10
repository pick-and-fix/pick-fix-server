const User = require("../models/User");
const Plan = require("../models/Plan");

exports.checkUserEmail = async (email) => {
  return await User.findOne({ email: email }).lean().exec();
};

exports.saveNewPlan = async ({ userId, newPlan }) => {
  const savedPlan = await Plan.create(newPlan);
  const friendId = newPlan.friends;

  await User.findByIdAndUpdate(userId, {
    $push: { plans: savedPlan._id },
  }).exec();

  for (let i = 0; i < friendId.length; i++) {
    await User.findByIdAndUpdate(friendId[i], {
      $push: { plans: savedPlan._id },
    });
  }
};
