import express from "express";
import { getSpendingBreakdown, getIncomeOverview } from "../controllers/transactionController.js";
import { getTransactions, addTransaction, editTransaction, deleteTransaction } from "../controllers/mockTransactionController.js";

const router = express.Router();

router.get("/spending-breakdown", getSpendingBreakdown);
router.get("/income", getIncomeOverview);

// Mock transaction routes
router.get("/transactions", getTransactions);
router.post("/transactions", addTransaction);
router.put("/transactions/:id", editTransaction);
router.delete("/transactions/:id", deleteTransaction);

export default router;
