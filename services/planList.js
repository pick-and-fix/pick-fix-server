const Plan = require("../models/Plan");
const User = require("../models/User");

exports.getPlans = async (userId) => {
  const plans = {};

  const list = await User.findById(userId).populate({
    path: "plans",
    populate: { path: "friends" },
  });

  list.plans.map((plan) => {
    const afterSixTime = new Date(plan.date);
    const nowTime = new Date();

    afterSixTime.setHours(afterSixTime.getHours() + 6);

    if (nowTime < afterSixTime && plan.isFixed) {
      plans[plan._id] = {
        creator: plan.creator,
        place: plan.place,
        placeLocation: plan.placeLocation,
        date: plan.date,
        friends: plan.friends,
        pickNumber: plan.pickNumber,
        picks: plan.picks,
        isVoted: plan.isVoted,
        isFixed: plan.isFixed,
        voting: plan.voting,
      };
    }
  });

  return plans;
};
