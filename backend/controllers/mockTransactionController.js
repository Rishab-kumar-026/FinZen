// Mock transaction data (in-memory array)
let mockTransactions = [
  {
    id: 1,
    title: "Swiggy Order",
    category: "Food",
    date: "2025-06-23",
    amount: -250,
    icon: "🍔",
  },
  {
    id: 2,
    title: "Salary Credited",
    category: "Income",
    date: "2025-06-21",
    amount: 25000,
    icon: "💼",
  },
  {
    id: 3,
    title: "Phone Recharge",
    category: "Bills",
    date: "2025-06-20",
    amount: -399,
    icon: "📱",
  },
  {
    id: 4,
    title: "Movie Night",
    category: "Entertainment",
    date: "2025-06-19",
    amount: -600,
    icon: "🎬",
  },
];

export const getTransactions = (req, res) => {
  res.json(mockTransactions);
};

export const addTransaction = (req, res) => {
  const { title, category, date, amount, icon } = req.body;
  const newTransaction = {
    id: Date.now(),
    title,
    category,
    date,
    amount,
    icon: icon || "💸",
  };
  mockTransactions.unshift(newTransaction);
  res.status(201).json(newTransaction);
};

export const editTransaction = (req, res) => {
  const { id } = req.params;
  const { title, category, date, amount, icon } = req.body;
  let updated = null;
  mockTransactions = mockTransactions.map((txn) => {
    if (txn.id === Number(id)) {
      updated = { ...txn, title, category, date, amount, icon };
      return updated;
    }
    return txn;
  });
  if (updated) {
    res.json(updated);
  } else {
    res.status(404).json({ message: "Transaction not found" });
  }
};

export const deleteTransaction = (req, res) => {
  const { id } = req.params;
  const initialLength = mockTransactions.length;
  mockTransactions = mockTransactions.filter((txn) => txn.id !== Number(id));
  if (mockTransactions.length < initialLength) {
    res.json({ success: true });
  } else {
    res.status(404).json({ message: "Transaction not found" });
  }
}; 