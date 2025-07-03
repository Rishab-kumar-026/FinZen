import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchSpendingBreakdown } from "../../utils/api"; // adjust path as needed
import { useNavigate } from "react-router-dom";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FaShoppingCart,
  FaUtensils,
  FaBolt,
  FaBriefcase,
} from "react-icons/fa";

const COLORS = ["#00ff87", "#60efff", "#f87171", "#22c55e", "#facc15", "#818cf8"];

// Category Icon Map
const CATEGORY_ICONS = {
  Food: <FaUtensils />,
  Shopping: <FaShoppingCart />,
  Utilities: <FaBolt />,
  Income: <FaBriefcase />,
};

const SpendingChart = ({ preview = false }) => {
  const [selectedRange, setSelectedRange] = useState("month");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 useEffect(() => {
  const loadData = async () => {
    setLoading(true);
    const data = await fetchSpendingBreakdown(selectedRange);

    const enhanced = data.map((item) => ({
      ...item,
      icon: CATEGORY_ICONS[item.name] || "💸",
    }));

    setChartData(enhanced);
    setLoading(false);
  };

  loadData();
}, [selectedRange]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 shadow-lg relative w-full min-w-0 overflow-x-auto"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-transparent bg-clip-text">
          Spending Breakdown
        </h3>
        <div className="flex gap-2">
          {["day", "week", "month"].map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={`px-3 py-1 rounded-md text-sm ${
                selectedRange === range
                  ? "bg-[#1db954] text-white"
                  : "bg-white/10 text-white/60"
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        {/* Blur overlay for preview mode */}
        {preview && (
          <div
            className="absolute inset-0 z-10 backdrop-blur-[4px] bg-black/10 flex items-center justify-center cursor-pointer rounded-xl hover:bg-black/20 transition"
            onClick={() => navigate("/dashboard/insights")}
          >
            <span className="text-white/80 font-semibold text-lg">Click to view full insights</span>
          </div>
        )}
        {loading ? (
          <p className="text-white text-center">Loading...</p>
        ) : chartData.length === 0 ? (
          <p className="text-white text-center">No data to display.</p>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-6 space-y-2">
              {chartData.map((entry, i) => (
                <div key={i} className="flex items-center gap-3 text-white/80">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                  />
                  <span className="text-lg">{entry.icon}</span>
                  <span className="font-medium">{entry.name}</span>
                  <span className="ml-auto text-white font-semibold">
                    ₹{entry.value}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default SpendingChart;
