const express = require("express");

const {
  getAllTransactions,
  addTransactions,
  editTransaction,
  deleteTransaction,
} = require("../controllers/transactionCtrl");

//Router object
const router = express.Router();

//routes
//GET Transactions
router.post("/get-transactions", getAllTransactions);

//POST || Add Transactions
router.post("/add-transaction", addTransactions);

//POST || Edit Transactions
router.post("/edit-transaction", editTransaction);

//POST || Delete Transactions
router.post("/delete-transaction", deleteTransaction);

//POST || Register

module.exports = router;
