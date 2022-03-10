const Plan = require("../models/Plan");
const User = require("../models/User");

exports.getPlans = async (userId) => {
  const plans = {};

  const list = await User.findById(userId).populate({
    path: "plans",
    populate: { path: "friends" },
  });

  console.log("list>>", list);
  list.plans.map((plan) => {
    const afterSixTime = new Date(plan.date);
    const nowTime = new Date();

    afterSixTime.setHours(afterSixTime.getHours() + 6);

    if (nowTime < afterSixTime && plan.isFixed) {
      plans[plan._id] = {
        place: plan.place,
        date: plan.date,
        friends: plan.friends,
      };
    }
  });

  return plans;
};
