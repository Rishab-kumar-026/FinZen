import express from "express";
import { getIncomeVsExpense } from "../controllers/incomevsexpense.js";

const router = express.Router();

router.get("/income-vs-expense", getIncomeVsExpense);

export default router;
