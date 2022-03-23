const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const AgencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  address1: {
    type: String,
    required: true,
  },

  address2: {
    type: String,
    default: "",
  },

  state: {
    type: String,
    default: "",
  },

  city: {
    type: String,
    default: "",
  },

  phoneNumber: {
    type: Number,
  },

  clients: [
    {
      type: Schema.Types.ObjectId,
      ref: "Client",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Agency", AgencySchema);
