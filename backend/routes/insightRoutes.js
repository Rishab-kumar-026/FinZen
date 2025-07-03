import express from "express";
import { getInsights, getSpendingCoachAdvice, getPortfolio, tradePortfolio, getLoanEligibility, getGoalBooster } from "../controllers/insightController.js";

const router = express.Router();

router.get("/insights", getInsights);

router.get("/portfolio", getPortfolio);
router.post("/portfolio/trade", tradePortfolio);
router.get("/loan-eligibility", getLoanEligibility);
router.get("/goal-booster", getGoalBooster);

export default router;
