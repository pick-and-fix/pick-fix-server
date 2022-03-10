const User = require("../models/User");

exports.getVotes = async (userId) => {
  const votes = {};

  const voteList = await User.findById(userId).populate({
    path: "plans",
    populate: { path: "friends" },
  });

  voteList.plans.map((plan) => {
    if (!plan.isVoted) {
      votes[plan._id] = {
        creator: plan.creator,
        place: plan.place,
        placeLocation: plan.placeLocation,
        date: plan.date,
        friends: plan.friends,
        picks: [],
        isVoted: false,
        isFixed: false,
      };
    }
  });

  return votes;
};
