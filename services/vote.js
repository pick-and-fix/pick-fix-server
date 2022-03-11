const Plan = require("../models/Plan");
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

exports.getAllPick = async ({ userId, planId }) => {
  const friendsPicks = {};

  const picks = await Plan.findById(planId).populate({
    path: "friends",
    populate: { path: "picks" },
  });

  const place = {
    place: picks.place,
    placeLocation: picks.placeLocation,
  };

  picks.friends.map((data) => {
    data.picks.map((pick) => {
      friendsPicks[pick._id] = {
        author: pick.author,
        name: pick.name,
        address: pick.address,
        rating: pick.rating,
        type: pick.type,
        image: pick.image,
        location: pick.location,
      };
    });
  });

  return {
    friendsPicks,
    place,
  };
};
