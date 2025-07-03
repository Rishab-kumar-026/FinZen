import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { fetchIncomeBreakdown } from "../../utils/api";
import { FaBriefcase, FaGift, FaChartLine } from "react-icons/fa";

// Customize colors and icons per category
const COLORS = ["#facc15", "#22c55e", "#818cf8", "#f97316"];
const CATEGORY_ICONS = {
  Salary: <FaBriefcase />,
  Bonus: <FaGift />,
  Investment: <FaChartLine />,
};

const IncomeChart = () => {
  const [selectedRange, setSelectedRange] = useState("month");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadIncome = async () => {
      setLoading(true);
      const data = await fetchIncomeBreakdown(selectedRange);

      const enhanced = data.map((item) => ({
        ...item,
        icon: CATEGORY_ICONS[item.name] || "💼",
      }));

      setChartData(enhanced);
      setLoading(false);
    };

    loadIncome();
  }, [selectedRange]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 shadow-lg w-full min-w-0 overflow-x-auto"
    >
      <div className="flex items-center justify-between mb-4 ">
        <h3 className="text-xl font-semibold bg-gradient-to-r from-yellow-400 to-green-500 text-transparent bg-clip-text">
          Income Breakdown
        </h3>
        <div className="flex gap-2">
          {["day", "week", "month"].map((range) => (
            <button
            type="button"
              key={range}
              onClick={() => setSelectedRange(range)}
              className={`px-3 py-1 rounded-md text-sm ${
                selectedRange === range
                  ? "bg-yellow-400 text-black"
                  : "bg-white/10 text-white/60"
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-white text-center">Loading income...</p>
      ) : chartData.length === 0 ? (
        <p className="text-white text-center">No income data.</p>
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
                  <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />  
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
    </motion.div>
  );
};

export default IncomeChart;
