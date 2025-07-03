import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  fetchTransactions,
  addTransaction,
  editTransaction,
  deleteTransaction,
} from "../../utils/api";
import { useNavigate } from "react-router-dom";

const filters = ["All", "Income", "Expense"];

const defaultForm = {
  title: "",
  category: "",
  date: "",
  amount: "",
  icon: "",
};

const CATEGORIES = [
  "Groceries",
  "Dining Out",
  "Transport",
  "Utilities",
  "Savings",
  "Food",
  "Shopping",
  "Bills",
  "Entertainment",
  "Income"
];

const TransactionHistory = ({ preview = false }) => {
  const [transactions, setTransactions] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch transactions
  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    const handler = () => openModal();
    window.addEventListener("openAddTransactionModal", handler);
    return () => window.removeEventListener("openAddTransactionModal", handler);
  }, []);

  const loadTransactions = async () => {
    setLoading(true);
    const data = await fetchTransactions();
    setTransactions(data);
    setLoading(false);
  };

  // Filtered and searched transactions
  const filtered = transactions.filter((txn) => {
    const matchType =
      activeFilter === "All" ||
      (activeFilter === "Income" && txn.amount > 0) ||
      (activeFilter === "Expense" && txn.amount < 0);
    const matchSearch =
      txn.title.toLowerCase().includes(search.toLowerCase()) ||
      txn.category.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  // Handle add/edit modal open
  const openModal = (txn = null) => {
    setEditId(txn ? txn.id : null);
    setForm(
      txn
        ? { ...txn, amount: String(txn.amount) }
        : { ...defaultForm, date: new Date().toISOString().slice(0, 10) }
    );
    setShowModal(true);
  };

  // Handle add/edit submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const txnData = {
      ...form,
      amount: Number(form.amount),
    };
    if (editId) {
      await editTransaction(editId, txnData);
    } else {
      await addTransaction(txnData);
    }
    setShowModal(false);
    setEditId(null);
    setForm(defaultForm);
    loadTransactions();
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Delete this transaction?")) {
      await deleteTransaction(id);
      loadTransactions();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-lg relative"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h3 className="text-xl font-semibold bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-transparent bg-clip-text">
          Transactions
        </h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 rounded-md bg-white/10 text-white placeholder-white/60 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-white px-4 py-1 rounded-md font-semibold shadow hover:scale-105 transition-transform"
            onClick={() => openModal()}
          >
            + Add
          </button>
        </div>
      </div>
      {/* Filters */}
      <div className="flex gap-4 mb-4">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-1 rounded-full font-medium transition-all text-sm ${
              activeFilter === filter
                ? "bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-white"
                : "bg-white/10 text-white/60 hover:text-white"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      {/* Transaction Table */}
      <div className="overflow-x-auto max-h-[350px] scrollbar-thin scrollbar-thumb-[#1db954]/40 relative">
        {/* Blur overlay for preview mode */}
        {preview && (
          <div
            className="absolute inset-0 z-10 backdrop-blur-[4px] bg-black/10 flex items-center justify-center cursor-pointer rounded-xl hover:bg-black/20 transition"
            onClick={() => navigate("/dashboard/transactions")}
          >
            <span className="text-white/80 font-semibold text-lg">Click to view all transactions</span>
          </div>
        )}
        {loading ? (
          <p className="text-white text-center">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-white text-center">No transactions found.</p>
        ) : (
          <table className="w-full text-white/90">
            <thead>
              <tr className="bg-white/10">
                <th className="p-2 text-left">Title</th>
                <th className="p-2 text-left">Category</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-right">Amount</th>
                <th className="p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((txn) => (
                <tr
                  key={txn.id}
                  className="hover:bg-white/20 transition border-b border-white/5"
                >
                  <td className="p-2 flex items-center gap-2">
                    <span className="text-xl">{txn.icon}</span>
                    <span>{txn.title}</span>
                  </td>
                  <td className="p-2">{txn.category}</td>
                  <td className="p-2">{txn.date}</td>
                  <td
                    className={`p-2 text-right font-semibold ${
                      txn.amount < 0 ? "text-red-400" : "text-green-400"
                    }`}
                  >
                    {txn.amount < 0 ? "-" : "+"}₹{Math.abs(txn.amount)}
                  </td>
                  <td className="p-2 text-center">
                    <button
                      className="text-blue-400 hover:underline mr-2"
                      onClick={() => openModal(txn)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-400 hover:underline"
                      onClick={() => handleDelete(txn.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <motion.form
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-[#0a0f1c] border border-white/10 rounded-xl p-8 shadow-2xl w-full max-w-md text-white space-y-4"
            onSubmit={handleSubmit}
          >
            <h4 className="text-2xl font-bold mb-2">
              {editId ? "Edit Transaction" : "Add Transaction"}
            </h4>
            <select
              className="w-full px-4 py-3 rounded-lg bg-[#181f2e] border border-white/20 text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#1db954] transition-all placeholder-white/60 appearance-none mb-2"
              value={form.type || 'expense'}
              onChange={e => setForm({ ...form, type: e.target.value })}
              required
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <input
              type="text"
              placeholder="Title"
              className="w-full p-3 rounded-lg bg-white/10 placeholder-white focus:outline-none"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <select
              className="w-full px-4 py-3 rounded-lg bg-[#181f2e] border border-white/20 text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#1db954] transition-all placeholder-white/60 appearance-none"
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              required
            >
              <option value="" disabled>Select Category</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input
              type="date"
              className="w-full p-3 rounded-lg bg-white/10 placeholder-white focus:outline-none"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Amount"
              className="w-full p-3 rounded-lg bg-white/10 placeholder-white focus:outline-none"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Icon (emoji)"
              className="w-full p-3 rounded-lg bg-white/10 placeholder-white focus:outline-none"
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
            />
            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-white py-2 rounded-lg font-semibold shadow hover:scale-105 transition-transform"
              >
                {editId ? "Save" : "Add"}
              </button>
              <button
                type="button"
                className="flex-1 bg-white/10 text-white py-2 rounded-lg font-semibold hover:bg-white/20"
                onClick={() => {
                  setShowModal(false);
                  setEditId(null);
                  setForm(defaultForm);
                }}
              >
                Cancel
              </button>
            </div>
          </motion.form>
        </div>
      )}
    </motion.div>
  );
};

export default TransactionHistory;
