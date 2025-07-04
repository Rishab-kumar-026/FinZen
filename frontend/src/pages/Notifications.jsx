import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BubbleBackground from "./BubbleBackground";
import {
  Bell,
  Utensils,
  ShoppingBag,
  Home,
  Plane,
  MoreHorizontal,
  DollarSign,
  Calendar,
  TrendingUp,
  PieChart,
  Play,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Trash2
} from "lucide-react";

const categoryIconMap = {
  Food: Utensils,
  Shopping: ShoppingBag,
  Rent: Home,
  Travel: Plane,
  Entertainment: Play,
  Others: MoreHorizontal,
  "Loan": DollarSign,
  "Calendar": Calendar,
  "TrendingUp": TrendingUp,
  "PieChart": PieChart,
};

function formatDateTime(isoString) {
  const d = new Date(isoString);
  return d.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("desc");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("finzen_notifications") || "[]");
    setNotifications(stored);
  }, []);

  const toggleRead = (idx) => {
    const updated = notifications.map((n, i) =>
      i === idx ? { ...n, read: !n.read } : n
    );
    setNotifications(updated);
    localStorage.setItem("finzen_notifications", JSON.stringify(updated));
  };

  const deleteNotification = (idx) => {
    const updated = notifications.filter((_, i) => i !== idx);
    setNotifications(updated);
    localStorage.setItem("finzen_notifications", JSON.stringify(updated));
  };

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem("finzen_notifications", JSON.stringify(updated));
  };

  const clearAll = () => {
    setNotifications([]);
    localStorage.removeItem("finzen_notifications");
  };

  let filtered = notifications;
  if (filter === "unread") filtered = filtered.filter((n) => !n.read);
  if (filter === "read") filtered = filtered.filter((n) => n.read);
  if (filter !== "all" && filter !== "read" && filter !== "unread") filtered = filtered.filter((n) => n.category === filter);
  if (sort === "desc") filtered = [...filtered].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  if (sort === "asc") filtered = [...filtered].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  const uniqueCategories = Array.from(new Set(notifications.map((n) => n.category)));

  return (
    <div className="min-h-screen bg-[#0a0f1c] pt-28 px-4 md:px-0 pb-8 relative">
      <BubbleBackground />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto w-full"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-transparent bg-clip-text">Notifications</h2>
            <p className="text-white/60 mt-1">Track your spending alerts in one place.</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="rounded-lg px-3 py-2 bg-gray-900 text-white border border-gray-700 focus:outline-none"
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              {uniqueCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="rounded-lg px-3 py-2 bg-gray-900 text-white border border-gray-700 focus:outline-none"
            >
              <option value="desc">Newest</option>
              <option value="asc">Oldest</option>
            </select>
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm"
              title="Mark all as read"
            >
              <CheckCircle className="w-4 h-4" /> Mark all as read
            </button>
            <button
              onClick={clearAll}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm"
              title="Clear all notifications"
            >
              <Trash2 className="w-4 h-4" /> Clear all
            </button>
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="text-white/60 text-center py-24 flex flex-col items-center gap-2">
            <Bell className="text-4xl mb-2" />
            🎉 You're on track! No budget limits exceeded recently.
          </div>
        ) : (
          <ul className="space-y-4">
            {filtered.map((n, idx) => {
              const Icon = categoryIconMap[n.category] || AlertCircle;
              return (
                <li
                  key={n.timestamp + n.category + idx}
                  className={`flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-4 shadow-sm hover:bg-white/10 transition relative ${n.read ? 'opacity-60' : ''}`}
                >
                  <div className="mt-1">
                    <Icon className="w-7 h-7 text-[#1db954]" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between min-h-[70px]">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white text-lg">{n.title}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-block px-2 py-0.5 rounded bg-[#1db954]/20 text-[#1db954] text-xs font-semibold">{n.category}</span>
                        {typeof n.amountExceeded === 'number' && n.amountExceeded > 0 ? (
                          <span className="inline-block px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-xs font-semibold">
                            Over by ₹{n.amountExceeded.toLocaleString()}
                          </span>
                        ) : (
                          <span className="inline-block px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-xs font-semibold">
                            Spent: ₹{n.spent?.toLocaleString?.()} / Limit: ₹{n.limit?.toLocaleString?.()}
                          </span>
                        )}
                        <span className={`ml-2 text-xs font-semibold ${n.read ? 'text-gray-400' : 'text-blue-400'}`}>{n.read ? 'Read' : 'Unread'}</span>
                      </div>
                      <div className="text-white/80 mt-1 text-sm">{n.message}</div>
                    </div>
                    <div className="flex items-center justify-end mt-2">
                      <span className="text-xs text-white/40 ml-2 whitespace-nowrap">{formatDateTime(n.timestamp)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleRead(idx)}
                    className="absolute top-3 right-14 text-blue-400 hover:text-blue-600"
                    title={n.read ? "Mark as unread" : "Mark as read"}
                  >
                    {n.read ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => deleteNotification(idx)}
                    className="absolute top-3 right-3 text-red-400 hover:text-red-600 ml-3"
                    title="Delete notification"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </motion.div>
    </div>
  );
};

export default Notifications; 