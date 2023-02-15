const Transaction = require("../models/transactionModel");
const moment = require("moment");

const getAllTransactions = async (req, res) => {
  try {
    const { freq, selectedDate, type } = req.body;
    const allTransactions = await Transaction.find({
      ...(freq !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(freq), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),
      userid: req.body.userid,
      ...(type !== "all" && { type }),
    });
    if (allTransactions.length > 0) {
      res.status(201).send(allTransactions);
    } else {
      res.status(404).send({ message: "No transactions found" });
    }
  } catch (error) {
    res.status(404).send({ message: "Error Occured", error });
  }
};

const addTransactions = async (req, res) => {
  try {
    const newTransaction = await Transaction.create(req.body);
    await newTransaction.save();
    res.status(201).send(newTransaction);
  } catch (e) {
    res.status(404).send(e);
  }
};

const editTransaction = async (req, res) => {
  try {
    await Transaction.findOneAndUpdate(
      {
        _id: req.body.transactionId,
      },
      req.body.payload
    );

    res.status(200).send("Edited transaction successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteTransaction = async (req, res) => {
  try {
    await Transaction.findOneAndDelete({ _id: req.body.transactionId });
    res.status(200).send("Transaction deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getAllTransactions,
  addTransactions,
  editTransaction,
  deleteTransaction,
};
