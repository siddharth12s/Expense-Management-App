const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userid: {
      type: 'string',
      required: true,
    },
    amount: {
      type: "number",
      required: [true, "Amount is required"],
    },
    type: {
      type: "string",
      required: [true, "Type is required"]
    },
    category: {
      type: "string",
      required: [true, "Category is required"],
    },
    reference: {
      type: "string",
    },
    description: {
      type: "string",
      required: [true, "Description is required"],
    },
    date: {
      type: "Date",
      required: [true, "Date is required"],
    }, 
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);
