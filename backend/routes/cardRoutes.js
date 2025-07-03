import express from "express";
import { getCardsOverview } from "../controllers/cardController.js";

const router = express.Router();

router.get("/cards", getCardsOverview);

export default router;
