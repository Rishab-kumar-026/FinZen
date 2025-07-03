import React, { useState } from "react";
import { motion } from "framer-motion";
import { fetchGoalBooster } from "../../utils/api";

const GoalBooster = () => {
  const [goal, setGoal] = useState(20000);
  const [current, setCurrent] = useState(8000);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheck = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    const res = await fetchGoalBooster(goal, current);
    if (res) setResult(res);
    else setError("Could not fetch plan. Try again.");
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-lg mb-8"
    >
      <h3 className="text-xl font-semibold bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-transparent bg-clip-text mb-4">
        Goal Booster
      </h3>
      <form className="space-y-4" onSubmit={handleCheck}>
        <input
          type="number"
          placeholder="Savings Goal (₹)"
          className="w-full p-3 rounded-lg bg-white/10 placeholder-white text-white focus:outline-none"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Current Savings (₹)"
          className="w-full p-3 rounded-lg bg-white/10 placeholder-white text-white focus:outline-none"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-white py-2 rounded-lg font-semibold shadow hover:scale-105 transition-transform"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Boost My Goal"}
        </button>
      </form>
      {error && <p className="text-red-400 mt-2">{error}</p>}
      {result && (
        <div className="mt-6">
          <div className="mb-4">
            <p className="text-white/80 mb-1 font-semibold">Plan:</p>
            <p className="text-white/70">{result.plan}</p>
            <div className="w-full bg-white/10 rounded-full h-4 mt-4">
              <div
                className="h-4 rounded-full bg-gradient-to-r from-[#1db954] to-[#1e90ff] transition-all"
                style={{ width: `${result.progress}%` }}
              ></div>
            </div>
            <p className="text-white/60 mt-1 text-sm">Progress: <span className="font-bold">{result.progress}%</span> (₹{result.current} / ₹{result.goal})</p>
          </div>
          <div>
            <p className="text-white/80 mb-1 font-semibold">Suggested Challenges:</p>
            <ul className="list-disc ml-6 text-white/70">
              {result.challenges.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default GoalBooster; 