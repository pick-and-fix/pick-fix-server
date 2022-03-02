const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email must be uniq"],
    required: true,
  },
  name: {
    type: String,
    require: [true, "User name must be required"],
  },
  plans: [
    {
      type: Schema.Types.ObjectId,
      ref: "Plan",
    },
  ],
  picks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Pick",
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
