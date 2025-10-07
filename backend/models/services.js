const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: String,
  // providerId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Provider", // MUST match your Provider model name
  //     required: true,
  //   },
},{timestamps: true}
);

module.exports = mongoose.model("service", serviceSchema);