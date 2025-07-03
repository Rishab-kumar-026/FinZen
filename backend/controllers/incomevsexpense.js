import moment from "moment";
import Transaction from "../models/Transaction.js";

export const getIncomeVsExpense = async (req, res) => {
  const { filter = "month" } = req.query;
  const userId = req.user.id;

  let startDate;
  const today = moment().endOf("day");

  if (filter === "day") {
    startDate = moment().startOf("day");
  } else if (filter === "week") {
    startDate = moment().startOf("week");
  } else {
    startDate = moment().startOf("month");
  }

  try {
    const transactions = await Transaction.find({
      user: userId,
      date: { $gte: startDate.toDate(), $lte: today.toDate() },
    });

    const summary = {};

    transactions.forEach((tx) => {
      const dateKey = moment(tx.date).format("YYYY-MM-DD");

      if (!summary[dateKey]) {
        summary[dateKey] = { income: 0, expense: 0 };
      }

      if (tx.type === "income") {
        summary[dateKey].income += tx.amount;
      } else if (tx.type === "expense") {
        summary[dateKey].expense += tx.amount;
      }
    });

    const result = Object.keys(summary)
      .sort()
      .map((date) => ({
        date,
        income: summary[date].income,
        expense: summary[date].expense,
      }));

    res.json(result);
  } catch (err) {
    console.error("❌ Income vs Expense error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
