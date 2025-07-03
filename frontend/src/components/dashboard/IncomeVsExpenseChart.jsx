import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fetchIncomeVsExpense } from "../../utils/api";

const IncomeVsExpenseChart = () => {
  const [filter, setFilter] = useState("month");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);

  // Format date for display based on filter type
  const formatDateForDisplay = (dateString, filter) => {
    const date = new Date(dateString);

    switch (filter) {
      case "day":
        return date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
        });
      case "week":
        return date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
        });
      case "month":
        return date.toLocaleDateString("en-GB", {
          month: "short",
          year: "2-digit",
        });
      default:
        return date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
        });
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      try {
        const rawData = await fetchIncomeVsExpense(filter);

        // Process and format the data from backend
        const processedData = rawData.map((item) => ({
          ...item,
          displayDate: formatDateForDisplay(item.date, filter),
          rawDate: item.date, // Keep original date for sorting
        }));

        // Sort by date to ensure left-to-right rendering
        const sortedData = processedData.sort(
          (a, b) => new Date(a.rawDate) - new Date(b.rawDate)
        );

        setData(sortedData);
        setAnimationKey((prev) => prev + 1); // Force re-animation
      } catch (error) {
        console.error("Error loading chart data:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [filter]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/95 backdrop-blur-sm border border-white/20 rounded-lg p-4 shadow-2xl">
          <p className="text-white/80 text-sm mb-2 font-medium">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-white font-semibold">
                {entry.name}: ₹{entry.value?.toLocaleString() || 0}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomDot = (props) => {
    const { cx, cy, fill, dataKey } = props;
    return (
      <circle
        cx={cx}
        cy={cy}
        r={4}
        fill={fill}
        stroke="white"
        strokeWidth={2}
        className="drop-shadow-lg animate-pulse"
        style={{
          filter: `drop-shadow(0 0 8px ${fill})`,
        }}
      />
    );
  };

  return (
    <div className="w-full min-w-0 bg-transparent p-4 sm:p-6 overflow-x-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text mb-2">
            Financial Flow Analytics
          </h1>
          <p className="text-white/60 text-lg">
            Track your income and expenses with beautiful visualizations
          </p>
        </div>

        {/* Main Chart Container */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Controls */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 text-transparent bg-clip-text">
              Income vs Expense Flow
            </h3>
            <div className="overflow-x-auto whitespace-nowrap flex gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
              {['day', 'week', 'month'].map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`min-w-[90px] px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform ${
                    filter === f
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Chart */}
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                <p className="text-white/60 text-lg">
                  Loading beautiful charts...
                </p>
              </div>
            </div>
          ) : data.length === 0 ? (
            <div className="flex items-center justify-center h-96">
              <p className="text-white/60 text-lg">
                No data available for visualization
              </p>
            </div>
          ) : (
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  key={animationKey}
                  data={data}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <defs>
                    <linearGradient
                      id="incomeGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop
                        offset="100%"
                        stopColor="#10b981"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient
                      id="expenseGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
                      <stop
                        offset="100%"
                        stopColor="#f59e0b"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient
                      id="incomeStroke"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="50%" stopColor="#34d399" />
                      <stop offset="100%" stopColor="#6ee7b7" />
                    </linearGradient>
                    <linearGradient
                      id="expenseStroke"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="50%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#fcd34d" />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#ffffff15"
                    horizontal={true}
                    vertical={false}
                  />

                  <XAxis
                    dataKey="displayDate"
                    stroke="#94a3b8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#94a3b8" }}
                  />

                  <YAxis
                    stroke="#94a3b8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#94a3b8" }}
                    tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                  />

                  <Tooltip content={<CustomTooltip />} />

                  <Legend
                    verticalAlign="top"
                    height={36}
                    iconType="circle"
                    wrapperStyle={{
                      paddingBottom: "20px",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="url(#incomeStroke)"
                    strokeWidth={3}
                    dot={<CustomDot fill="#10b981" />}
                    activeDot={{
                      r: 6,
                      fill: "#10b981",
                      stroke: "white",
                      strokeWidth: 2,
                      filter: "drop-shadow(0 0 10px #10b981)",
                    }}
                    isAnimationActive={true}
                    animationDuration={2000}
                    animationEasing="ease-in-out"
                    name="Income"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />

                  <Line
                    type="monotone"
                    dataKey="expense"
                    stroke="url(#expenseStroke)"
                    strokeWidth={3}
                    dot={<CustomDot fill="#f59e0b" />}
                    activeDot={{
                      r: 6,
                      fill: "#f59e0b",
                      stroke: "white",
                      strokeWidth: 2,
                      filter: "drop-shadow(0 0 10px #f59e0b)",
                    }}
                    isAnimationActive={true}
                    animationDuration={2000}
                    animationEasing="ease-in-out"
                    animationDelay={500}
                    name="Expense"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Summary Cards */}
          {!loading && data.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 rounded-xl p-6">
                <h4 className="text-emerald-400 font-semibold mb-2">
                  Total Income
                </h4>
                <p className="text-2xl font-bold text-white">
                  ₹
                  {data
                    .reduce((sum, item) => sum + (item.income || 0), 0)
                    .toLocaleString()}
                </p>
              </div>
              <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-500/30 rounded-xl p-6">
                <h4 className="text-amber-400 font-semibold mb-2">
                  Total Expense
                </h4>
                <p className="text-2xl font-bold text-white">
                  ₹
                  {data
                    .reduce((sum, item) => sum + (item.expense || 0), 0)
                    .toLocaleString()}
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-6">
                <h4 className="text-blue-400 font-semibold mb-2">
                  Net Balance
                </h4>
                <p className="text-2xl font-bold text-white">
                  ₹
                  {data
                    .reduce(
                      (sum, item) =>
                        sum + ((item.income || 0) - (item.expense || 0)),
                      0
                    )
                    .toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncomeVsExpenseChart;
