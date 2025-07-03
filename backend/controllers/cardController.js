export const getCardsOverview = async (req, res) => {
  try {
    const overview = [
      {
        label: "Total Spend",
        title: "This Month",
        value: "₹12,500",
        gradient: "from-red-600 to-pink-600",
        icon: "💸",
      },
      {
        label: "Remaining Balance",
        title: "Available",
        value: "₹7,800",
        gradient: "from-emerald-400 to-cyan-500",
        icon: "💰",
      },
      {
        label: "Savings",
        title: "This Month",
        value: "₹3,200",
        gradient: "from-green-600 to-lime-500",
        icon: "🏦",
      },
      {
        label: "Investments",
        title: "Active",
        value: "₹5,000",
        gradient: "from-yellow-400 to-orange-500",
        icon: "📈",
      },
    ];

    res.json(overview);
  } catch (err) {
    console.error("Error fetching cards overview:", err);
    res.status(500).json({ message: "Server error" });
  }
};
