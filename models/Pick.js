const mongoose = require("mongoose");
const { Schema } = mongoose;

const PickSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    required: [true, "Author must be required"],
  },
  name: {
    type: String,
    required: [true, "Name must be required"],
  },
  address: {
    type: String,
    required: [true, "Address must be required"],
  },
  rating: {
    type: String,
    required: [true, "Rating must be required"],
  },
  image: String,
  type: {
    type: String,
    required: [true, "Type must be required"],
  },
  location: [
    {
      type: Number,
      required: [true, "Location must be required"],
    },
  ],
});

PickSchema.path("location").validate((value) => {
  return value.length === 2;
});

module.exports = mongoose.model("Pick", PickSchema);
