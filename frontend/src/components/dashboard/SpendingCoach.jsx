import React, { useState } from "react";
import { motion } from "framer-motion";
import { fetchSpendingCoachAdvice, fetchTransactions } from "../../utils/api";
import { FaRobot, FaChartPie, FaChartBar, FaCheckCircle, FaLightbulb } from 'react-icons/fa';

const COACH_TIPS = [
  "Track your expenses daily to spot patterns.",
  "Set a weekly spending limit and stick to it.",
  "Automate savings to reach your goals faster.",
  "Review subscriptions and cancel unused ones.",
  "Use cash for discretionary spending to control impulses."
];

const EXTRA_TIPS = [
  "Try the 50/30/20 rule for budgeting.",
  "Review your spending every Sunday.",
  "Use separate accounts for savings and expenses.",
  "Negotiate bills and look for discounts.",
  "Plan meals to save on groceries.",
  "Set up auto-pay for recurring bills.",
  "Track your net worth monthly.",
  "Avoid impulse purchases by waiting 24 hours."
];

const SpendingCoach = () => {
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [followup, setFollowup] = useState("");
  const [followupResponse, setFollowupResponse] = useState("");
  const [total, setTotal] = useState(null);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [showTipsModal, setShowTipsModal] = useState(false);
  const [budget, setBudget] = useState(0);
  const [budgetInput, setBudgetInput] = useState('');
  const [budgetSaved, setBudgetSaved] = useState(false);
  const [extraTipIdx, setExtraTipIdx] = useState(0);

  const handleAskCoach = async () => {
    setLoading(true);
    setError("");
    setFollowupResponse("");
    // Fetch recent transactions
    const transactions = await fetchTransactions();
    // Send to AI backend
    const data = await fetchSpendingCoachAdvice(transactions);
    if (data) {
      setAdvice(data.tips);
      setFollowup(data.followup);
      setTotal(data.total);
    } else setError("Could not fetch advice. Try again.");
    setLoading(false);
  };

  const handleFollowup = async () => {
    setLoading(true);
    setError("");
    // Send the follow-up question as a new prompt
    const transactions = await fetchTransactions();
    // If the followup is about monthly budget, send a followup field to the backend
    if (followup && followup.toLowerCase().includes("monthly budget")) {
      const data = await fetchSpendingCoachAdvice(transactions, followup);
      if (data) setFollowupResponse(data.tips || data);
      else setError("Could not fetch follow-up advice.");
      setLoading(false);
      return;
    }
    // Default: send as before
    const prompt = `User follow-up: ${followup}\nTransactions: ${transactions.map(t => `${t.title}: ₹${t.amount}`).join(", ")}`;
    const data = await fetchSpendingCoachAdvice([...transactions, { title: followup, amount: 0 }]);
    if (data) setFollowupResponse(data.tips || data);
    else setError("Could not fetch follow-up advice.");
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-br from-[#1db954]/30 to-[#1e90ff]/20 border border-white/10 rounded-3xl p-8 shadow-2xl mb-8 backdrop-blur-xl overflow-hidden"
    >
      {/* Animated Mascot */}
      <motion.div
        initial={{ scale: 0.8, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 8 }}
        className="absolute -top-8 -right-8 md:top-4 md:right-8 z-10"
      >
        <FaRobot size={72} className="text-[#1db954] drop-shadow-2xl animate-bounce" />
      </motion.div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-transparent bg-clip-text flex items-center gap-2">
          Spending Coach
        </h3>
        <button
          className="bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform"
          onClick={handleAskCoach}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Ask Coach"}
        </button>
      </div>
      {/* Carousel of tips */}
      <div className="mb-6 flex flex-col items-center">
        <motion.div
          key={carouselIdx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-white/20 border border-white/20 rounded-2xl px-6 py-4 text-lg text-white/90 shadow-lg max-w-xl text-center"
        >
          {COACH_TIPS[carouselIdx]}
        </motion.div>
        <div className="flex gap-2 mt-3">
          {COACH_TIPS.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full ${carouselIdx === idx ? 'bg-[#1db954]' : 'bg-white/30'} transition-all`}
              onClick={() => setCarouselIdx(idx)}
            />
          ))}
        </div>
      </div>
      {/* AI Advice Section */}
      <div className="mb-4">
        {error && <p className="text-red-400 mb-2">{error}</p>}
        {advice && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-white/80 mb-1 font-semibold"
          >
            <span>AI Tips:</span>
            <div className="text-white/90 whitespace-pre-line bg-white/20 rounded-2xl p-4 border border-white/20 mb-4 mt-2 shadow-lg">
              {advice}
            </div>
            {typeof total !== 'undefined' && (
              <div className="text-white/80 mb-2 font-semibold">Total Spending: ₹{total}</div>
            )}
            {followup && (
              <div className="mb-4">
                <button
                  className="bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-white px-4 py-1 rounded-md font-semibold shadow hover:scale-105 transition-transform mb-2"
                  onClick={handleFollowup}
                  disabled={loading}
                >
                  {loading ? "Thinking..." : followup}
                </button>
                {followupResponse && (
                  <div className="text-white/90 whitespace-pre-line bg-white/20 rounded-2xl p-4 border border-white/20 mt-2 shadow-lg">
                    {followupResponse}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
        {!advice && !loading && (
          <p className="text-white/70">Ask the Spending Coach for a breakdown and savings tips!</p>
        )}
      </div>
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 mt-6 justify-center">
        <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#1e90ff] to-[#1db954] text-white font-semibold shadow hover:scale-105 transition-all" onClick={() => setShowBudgetModal(true)}>Set Budget</button>
        <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-white font-semibold shadow hover:scale-105 transition-all" onClick={() => setShowReportsModal(true)}>View Reports</button>
        <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-400 to-yellow-400 text-white font-semibold shadow hover:scale-105 transition-all" onClick={() => setShowTipsModal(true)}>Get More Tips</button>
      </div>
      {/* Set Budget Modal */}
      {showBudgetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-[#1db954]/40 to-[#1e90ff]/30 border border-white/20 rounded-2xl p-8 shadow-2xl w-full max-w-md text-white backdrop-blur-xl"
          >
            <h4 className="text-2xl font-bold mb-4 flex items-center gap-2"><FaCheckCircle className="text-[#1db954]" /> Set Your Budget</h4>
            {budgetSaved ? (
              <div className="text-center">
                <p className="text-lg mb-4">Budget set to <span className="font-bold text-[#1db954]">₹{budget}</span>!</p>
                <button className="mt-2 px-6 py-2 rounded-full bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-white font-semibold shadow hover:scale-105" onClick={() => { setShowBudgetModal(false); setBudgetSaved(false); }}>Close</button>
              </div>
            ) : (
              <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); setBudget(Number(budgetInput)); setBudgetSaved(true); }}>
                <input
                  type="number"
                  placeholder="Enter monthly budget (₹)"
                  className="w-full px-4 py-3 rounded-lg bg-[#181f2e] border border-white/20 text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#1db954]"
                  value={budgetInput}
                  onChange={e => setBudgetInput(e.target.value)}
                  required
                />
                <button type="submit" className="px-6 py-2 rounded-full bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-white font-semibold shadow hover:scale-105">Save Budget</button>
                <button type="button" className="px-6 py-2 rounded-full bg-white/20 text-white font-semibold shadow hover:bg-white/30" onClick={() => setShowBudgetModal(false)}>Cancel</button>
              </form>
            )}
          </motion.div>
        </div>
      )}
      {/* Reports Modal */}
      {showReportsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-[#1e90ff]/40 to-[#1db954]/30 border border-white/20 rounded-2xl p-8 shadow-2xl w-full max-w-lg text-white backdrop-blur-xl"
          >
            <h4 className="text-2xl font-bold mb-4 flex items-center gap-2"><FaChartPie className="text-[#1e90ff]" /> Spending Reports</h4>
            <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
              {/* Mock Pie Chart */}
              <div className="bg-white/20 rounded-full w-40 h-40 flex items-center justify-center shadow-inner relative">
                <FaChartPie size={100} className="text-[#1db954] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />
                <span className="text-2xl font-bold text-white/90">Pie Chart</span>
              </div>
              {/* Mock Bar Chart */}
              <div className="bg-white/20 rounded-2xl w-48 h-40 flex flex-col items-center justify-center shadow-inner relative">
                <FaChartBar size={80} className="text-[#1e90ff] opacity-30 mb-2" />
                <span className="text-lg font-bold text-white/90">Bar Chart</span>
              </div>
            </div>
            <div className="mt-6 text-center">
              <button className="px-6 py-2 rounded-full bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-white font-semibold shadow hover:scale-105" onClick={() => setShowReportsModal(false)}>Close</button>
            </div>
          </motion.div>
        </div>
      )}
      {/* More Tips Modal */}
      {showTipsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-pink-400/40 to-yellow-400/30 border border-white/20 rounded-2xl p-8 shadow-2xl w-full max-w-md text-white backdrop-blur-xl flex flex-col items-center"
          >
            <h4 className="text-2xl font-bold mb-4 flex items-center gap-2"><FaLightbulb className="text-yellow-300" /> More Financial Tips</h4>
            <motion.div
              key={extraTipIdx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white/20 border border-white/20 rounded-2xl px-6 py-4 text-lg text-white/90 shadow-lg max-w-xl text-center mb-4"
            >
              {EXTRA_TIPS[extraTipIdx]}
            </motion.div>
            <div className="flex gap-2 mb-4">
              <button className="px-3 py-1 rounded-full bg-[#1db954] text-white font-semibold shadow hover:scale-110 transition-all" onClick={() => setExtraTipIdx((extraTipIdx - 1 + EXTRA_TIPS.length) % EXTRA_TIPS.length)}>&lt;</button>
              <button className="px-3 py-1 rounded-full bg-[#1e90ff] text-white font-semibold shadow hover:scale-110 transition-all" onClick={() => setExtraTipIdx((extraTipIdx + 1) % EXTRA_TIPS.length)}>&gt;</button>
            </div>
            <button className="px-6 py-2 rounded-full bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-white font-semibold shadow hover:scale-105" onClick={() => setShowTipsModal(false)}>Close</button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default SpendingCoach; 