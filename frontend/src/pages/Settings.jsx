import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "../components/layout/DashboardLayout";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile, updateUserProfile } from "../utils/api";
import Avatar1 from "../assets/avatars/Avatar1.svg";
import Avatar2 from "../assets/avatars/Avatar2.svg";
import Avatar3 from "../assets/avatars/Avatar3.svg";

const AVATAR_OPTIONS = [Avatar1, Avatar2, Avatar3];

const Settings = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [notifications, setNotifications] = useState(true);
  const [profile, setProfile] = useState({ firstName: "", email: "", goal: "", avatar: Avatar1 });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      const data = await fetchUserProfile();
      if (data) {
        setProfile({
          firstName: data.profile?.firstName || "",
          email: data.email || "",
          goal: data.goals?.savingsTarget || "",
          avatar: data.profile?.avatar || Avatar1
        });
      }
      setLoading(false);
    };
    loadProfile();
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    const res = await updateUserProfile({
      email: profile.email,
      "profile.firstName": profile.firstName,
      "goals.savingsTarget": profile.goal
    });
    if (res) setSuccess("Profile updated!");
    else setError("Failed to update profile.");
    setLoading(false);
  };

  const handleAvatarSelect = async (avatar) => {
    setProfile((prev) => ({ ...prev, avatar }));
    setLoading(true);
    setSuccess("");
    setError("");
    const res = await updateUserProfile({
      email: profile.email,
      "profile.firstName": profile.firstName,
      "goals.savingsTarget": profile.goal,
      "profile.avatar": avatar
    });
    if (res) setSuccess("Avatar updated!");
    else setError("Failed to update avatar.");
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <DashboardLayout>
      <div className="w-full flex justify-center px-2 pt-24 sm:px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md mx-auto"
        >
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-transparent bg-clip-text">Settings</h2>
          {/* User Profile Edit */}
          <form onSubmit={handleProfileSave} className="mb-6 text-white/80 space-y-6 bg-white/5 border border-white/10 rounded-xl p-6 shadow-lg">
            <div className="mb-2 text-lg font-semibold text-white/90">User Profile</div>
            {/* Avatar Selection */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-white/80">Avatar:</span>
              <img src={profile.avatar} alt="avatar" className="w-14 h-14 rounded-full border-2 border-[#1db954] bg-white/20" />
              <div className="flex gap-2">
                {AVATAR_OPTIONS.map((avatar, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`rounded-full border-2 ${profile.avatar === avatar ? "border-[#1db954] scale-110" : "border-transparent"} transition-transform bg-white/10 p-1`}
                    onClick={() => handleAvatarSelect(avatar)}
                  >
                    <img src={avatar} alt={`avatar${idx + 1}`} className="w-10 h-10 rounded-full" />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label className="flex flex-col">
                <span className="text-sm mb-1">Name</span>
                <input
                  type="text"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleProfileChange}
                  className="p-2 rounded bg-white/10 text-white focus:outline-none"
                  required
                />
              </label>
              <label className="flex flex-col">
                <span className="text-sm mb-1">Email</span>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  className="p-2 rounded bg-white/10 text-white focus:outline-none"
                  required
                />
              </label>
              <label className="flex flex-col">
                <span className="text-sm mb-1">Savings Goal (₹)</span>
                <input
                  type="number"
                  name="goal"
                  value={profile.goal}
                  onChange={handleProfileChange}
                  className="p-2 rounded bg-white/10 text-white focus:outline-none"
                />
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-white py-2 rounded-lg font-semibold shadow hover:scale-105 transition-transform mt-4"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Profile"}
            </button>
            {success && <div className="text-green-400 mt-2">{success}</div>}
            {error && <div className="text-red-400 mt-2">{error}</div>}
          </form>
          {/* Theme & Notifications */}
          <div className="mb-6 text-white/80 space-y-6">
            {/* Theme Toggle */}
            <div className="flex items-center justify-between bg-white/10 rounded-lg px-4 py-3">
              <span className="font-semibold">Theme</span>
              <button
                onClick={() => setDarkMode((prev) => !prev)}
                className={`px-4 py-2 rounded-full font-semibold transition-all shadow ${darkMode ? "bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-white" : "bg-white/20 text-white/80"}`}
              >
                {darkMode ? "Dark" : "Light"}
              </button>
            </div>
            {/* Notifications Toggle */}
            <div className="flex items-center justify-between bg-white/10 rounded-lg px-4 py-3">
              <span className="font-semibold">Notifications</span>
              <button
                onClick={() => setNotifications((prev) => !prev)}
                className={`px-4 py-2 rounded-full font-semibold transition-all shadow ${notifications ? "bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-white" : "bg-white/20 text-white/80"}`}
              >
                {notifications ? "Enabled" : "Disabled"}
              </button>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-white py-2 rounded-lg font-semibold shadow hover:scale-105 transition-transform mt-8"
          >
            Logout
          </button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Settings; 