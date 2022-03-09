const Pick = require("../models/Pick");
const User = require("../models/User");

exports.getPicks = async (userId) => {
  const picks = {};

  const pick = await User.findById(userId).populate("picks");

  pick.picks.map((pick) => {
    picks[pick._id] = {
      author: pick.author,
      name: pick.name,
      address: pick.address,
      rating: pick.rating,
      type: pick.type,
      image: pick.image,
      location: pick.location,
    };
  });

  return picks;
};

exports.saveNewPick = async ({ userId, newPick }) => {
  const savedNewPick = await Pick.create(newPick);

  await User.findByIdAndUpdate(userId, {
    $push: { picks: savedNewPick._id },
  }).exec();
};
