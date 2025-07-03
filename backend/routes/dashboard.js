import express from "express";
import { getSpendingCoachAdvice } from "../controllers/spendingCoachController.js";
const router = express.Router();

router.post("/spending-coach", getSpendingCoachAdvice);

export default router;
