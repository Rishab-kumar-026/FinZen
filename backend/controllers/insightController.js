export const getInsights = async (req, res) => {
  try {
    // Example logic - you can enhance this based on actual spending and goals
    const insights = [
      "You spent 40% of your budget on food.",
      "Try saving ₹500 more this week to hit your goal.",
      "Investments in mutual funds have shown steady growth.",
      "Consider reducing dine-out expenses to boost savings.",
    ];

    res.json(insights);
  } catch (err) {
    console.error("Error fetching insights:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSpendingCoachAdvice = async (req, res) => {
  try {
    // Mock analysis of recent transactions
    const mockTransactions = [
      { category: "Food", amount: 3200 },
      { category: "Transport", amount: 1200 },
      { category: "Entertainment", amount: 1800 },
      { category: "Bills", amount: 2500 },
      { category: "Shopping", amount: 2200 },
    ];
    // Calculate totals
    const total = mockTransactions.reduce((sum, t) => sum + t.amount, 0);
    const topCategories = mockTransactions
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);
    // Generate advice
    const tips = [
      `Your top spending categories this month are: ${topCategories
        .map((c) => c.category + " (₹" + c.amount + ")")
        .join(", ")}.`,
      `You spent a total of ₹${total} this month.`,
      `Try reducing your ${topCategories[0].category.toLowerCase()} expenses by 10% to save ₹${Math.round(
        topCategories[0].amount * 0.1
      )} next month.`,
      "Set a weekly budget and track your progress for better savings.",
    ];
    res.json({
      breakdown: topCategories,
      total,
      tips,
    });
  } catch (err) {
    console.error("Error in Spending Coach:", err);
    res.status(500).json({ message: "Server error" });
  }
};

let mockPortfolio = {
  holdings: [
    { asset: "Mutual Fund A", value: 12000, gain: 8 },
    { asset: "ETF B", value: 8000, gain: 5 },
    { asset: "Stock C", value: 5000, gain: -2 },
  ],
  totalValue: 25000,
  lastTrade: null,
};

export const getPortfolio = async (req, res) => {
  try {
    res.json(mockPortfolio);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const tradePortfolio = async (req, res) => {
  try {
    const { asset, amount } = req.body;
    // Find or add asset
    let found = false;
    mockPortfolio.holdings = mockPortfolio.holdings.map((h) => {
      if (h.asset === asset) {
        found = true;
        return { ...h, value: h.value + Number(amount) };
      }
      return h;
    });
    if (!found) {
      mockPortfolio.holdings.push({ asset, value: Number(amount), gain: 0 });
    }
    mockPortfolio.totalValue += Number(amount);
    mockPortfolio.lastTrade = { asset, amount, date: new Date().toISOString() };
    res.json({ success: true, message: `Invested ₹${amount} in ${asset}.`, portfolio: mockPortfolio });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getLoanEligibility = async (req, res) => {
  try {
    // Accept data from query or body for flexibility
    const income = Number(req.query.income || req.body.income || 0);
    const employment = (req.query.employment || req.body.employment || "").toLowerCase();
    const creditScore = Number(req.query.creditScore || req.body.creditScore || 0);

    let eligible = false;
    let reason = "";
    let maxLoan = 0;

    if (income >= 30000 && creditScore >= 700 && employment === "salaried") {
      eligible = true;
      maxLoan = income * 20;
      reason = `Eligible for up to ₹${maxLoan} loan.`;
    } else if (income >= 20000 && creditScore >= 650) {
      eligible = true;
      maxLoan = income * 10;
      reason = `Eligible for up to ₹${maxLoan} loan. Improve credit score for better offers.`;
    } else {
      reason = "Not eligible. Increase income or credit score, or check employment type.";
    }

    res.json({ eligible, maxLoan, reason, input: { income, employment, creditScore } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getGoalBooster = async (req, res) => {
  try {
    const goal = Number(req.query.goal || req.body.goal || 20000);
    const current = Number(req.query.current || req.body.current || 8000);
    const weeklySave = 1500; // mock
    const weeksLeft = Math.ceil((goal - current) / weeklySave);
    const plan = `If you save ₹${weeklySave} per week, you'll reach your goal in ${weeksLeft} weeks.`;
    const challenges = [
      "No coffee week: Save ₹300",
      "Cook at home challenge: Save ₹500",
      "Round-up savings: Every transaction rounds up to the next ₹100, auto-saved."
    ];
    res.json({
      goal,
      current,
      plan,
      challenges,
      progress: Math.min(100, Math.round((current / goal) * 100)),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
