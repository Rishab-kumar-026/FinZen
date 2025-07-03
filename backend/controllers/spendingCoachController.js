import fetch from "node-fetch";

const HF_TOKEN = process.env.HF_TOKEN;
const HF_API_URL = "https://api-inference.huggingface.co/models/google/flan-t5-base";

// Demo: cycle through different follow-up answers for the monthly budget question
const budgetTips = [
  "Start by tracking all your expenses for a month, then set a realistic limit for each category.",
  "Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings.",
  "Review your recurring subscriptions and cancel those you don't use.",
  "Set up automatic transfers to your savings account right after you get paid.",
  "Try using a budgeting app to monitor your spending in real time.",
  "Break your monthly budget into weekly targets to make it easier to follow.",
  "Review your budget at the end of each month and adjust as needed."
];
let budgetTipIndex = 0;

export const getSpendingCoachAdvice = async (req, res) => {
  try {
    // If this is a follow-up about monthly budget, return a cycling tip immediately
    if (req.body.followup && req.body.followup.toLowerCase().includes("monthly budget")) {
      const tip = budgetTips[budgetTipIndex % budgetTips.length];
      budgetTipIndex++;
      return res.json({ tips: tip, followup: "Would you like another budgeting tip?" });
    }

    const transactions = req.body.transactions;
    if (!transactions || !Array.isArray(transactions) || transactions.length === 0) {
      return res.status(400).json({ message: "No transactions provided." });
    }
    const summary = transactions
      .map((t) => `${t.title}: ₹${t.amount}`)
      .join(", ");
    const total = transactions.reduce((sum, t) => sum + t.amount, 0);
    const prompt = `You are a smart financial coach. Analyze these transactions: ${summary}.\nGive 2 specific, actionable, and personalized money-saving tips for the user.\nThen suggest a follow-up question the user could ask you for deeper insight.`;

    if (!HF_TOKEN) {
      // Fallback: Always return a mock response if no key
      return res.json({
        tips: `1. Track your spending on Shopping and try to reduce impulse purchases.\n2. Consider meal prepping to save on Dining Out.\nTotal spending: ₹${total}`,
        followup: "Would you like tips on how to set a monthly budget?",
        total
      });
    }

    const response = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Hugging Face API error:", errorText);
      // Fallback: Always return a mock response if Hugging Face fails
      return res.json({
        tips: `1. Track your spending on Shopping and try to reduce impulse purchases.\n2. Consider meal prepping to save on Dining Out.\nTotal spending: ₹${total}`,
        followup: "Would you like tips on how to set a monthly budget?",
        total
      });
    }

    const data = await response.json();
    const text = data[0]?.generated_text || "Try to save more this month!";
    // Split tips and follow-up question if possible
    const [tipsPart, followupPart] = text.split(/(?:Follow[- ]?up|Next|You could ask|\nQ:|\n- )/i);
    const tips = tipsPart?.trim() || text;
    let followup = followupPart?.replace(/^[^a-zA-Z0-9]*/, "").trim() || "What else can I do to save more?";

    // If the AI's followup is about monthly budget, cycle through demo answers
    if (followup.toLowerCase().includes("set a monthly budget")) {
      followup = budgetTips[budgetTipIndex % budgetTips.length];
      budgetTipIndex++;
    }

    console.log("Spending Coach response:", { tips, followup, total });
    res.json({ tips, followup, total });
  } catch (err) {
    console.error("❌ Error in getSpendingCoachAdvice:", err);
    res.status(500).json({ message: "AI service error" });
  }
}; 