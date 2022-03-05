const mongoose = require("mongoose");
const { Schema } = mongoose;

const PlanSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    required: [true, "Creator must be required"],
  },
  place: {
    type: String,
    required: [true, "Place must be required"],
  },
  placeLocation: [
    {
      type: String,
    },
  ],
  date: {
    type: String,
    required: [true, "Date must be required"],
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  voting: Object,
  pickNumber: {
    type: Number,
    required: [true, "Pick Number must be required"],
  },
  picks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Pick",
    },
  ],
  isVoted: Boolean,
  isFixed: Boolean,
});

module.exports = mongoose.model("Plan", PlanSchema);
