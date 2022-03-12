const Plan = require("../models/Plan");
const User = require("../models/User");
const Pick = require("../models/Pick");

exports.getVotes = async (userId) => {
  const votes = {};

  const voteList = await User.findById(userId).populate({
    path: "plans",
    populate: { path: "friends" },
  });

  voteList.plans.map((plan) => {
    if (!plan.isFixed) {
      votes[plan._id] = {
        creator: plan.creator,
        place: plan.place,
        placeLocation: plan.placeLocation,
        date: plan.date,
        friends: plan.friends,
        pickNumber: plan.pickNumber,
        voting: plan.voting,
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

exports.saveVote = async ({ userId, planId, vote }) => {
  const voteInfo = { id: userId, vote: vote };

  await Plan.findByIdAndUpdate(planId, {
    $push: { voting: voteInfo },
  }).exec();
};

exports.getResult = async (planId) => {
  const plan = await Plan.findById(planId);

  return plan;
};

exports.updateVoteState = async (planId) => {
  await Plan.findByIdAndUpdate(planId, { isVoted: true });
};

exports.saveFix = async ({ planId, finalPicks }) => {
  const picks = {};

  for (let i = 0; i < finalPicks.length; i++) {
    const pick = await Pick.findOne({ name: finalPicks[i] });

    picks[pick._id] = {
      author: pick.author,
      name: pick.name,
      address: pick.address,
      rating: pick.rating,
      image: pick.image,
      type: pick.type,
      location: pick.location,
    };
  }

  await Plan.findByIdAndUpdate(planId, { picks: picks });
  await Plan.findByIdAndUpdate(planId, { isFixed: true });
};
