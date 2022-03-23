const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const ClientSchema = new mongoose.Schema({

    agencyId: 
    {
      type: Schema.Types.ObjectId,
      ref: "Agency",
      required: true,
    },

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },


  phoneNumber: {
    type: Number,
    required: true,
  },


  totalBill: {
    type: Number,
    required: true,
  },


  

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Client", ClientSchema);
