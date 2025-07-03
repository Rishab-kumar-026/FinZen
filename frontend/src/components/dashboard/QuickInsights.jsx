import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaPiggyBank, FaWallet, FaArrowUp } from "react-icons/fa";
import { fetchInsights } from "../../utils/api"; // create this API helper if not done yet

const iconMap = {
  savings: <FaPiggyBank />,
  revenue: <FaWallet />,
  food: <FaArrowUp />,
};

const colorMap = {
  savings: "bg-emerald-500/20 text-emerald-300",
  revenue: "bg-cyan-500/20 text-cyan-300",
  food: "bg-pink-500/20 text-pink-300",
};

const QuickInsights = () => {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getData = async () => {
      const data = await fetchInsights(token);
      const formatted = data.map((tip) => {
        // Simple keyword matching — you can adjust logic here
        if (tip.includes("saving") || tip.toLowerCase().includes("goal"))
          return { title: tip, amount: "₹12,000", type: "savings" };
        if (tip.toLowerCase().includes("revenue") || tip.includes("week"))
          return { title: tip, amount: "₹4,000", type: "revenue" };
        if (tip.toLowerCase().includes("food"))
          return { title: tip, amount: "-₹500", type: "food" };
        return { title: tip, amount: "₹0", type: "savings" };
      });

      setInsights(formatted);
    };

    getData();
  }, []);

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-transparent bg-clip-text">
        Quick Insights
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-full overflow-x-auto">
        {insights.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow-md hover:scale-[1.02] transition-all min-w-0"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full text-xl ${colorMap[item.type]}`}>
                {iconMap[item.type]}
              </div>
              <div>
                <p className="text-sm text-white/60">{item.title}</p>
                <p className="text-xl font-bold text-white">{item.amount}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 text-right">
        <a href="/dashboard/insights" className="inline-block text-sm text-[#1db954] hover:underline hover:text-[#1e90ff] transition-colors font-semibold">Learn more &rarr;</a>
      </div>
    </div>
  );
};

export default QuickInsights;
