import React from "react";
import { motion } from "framer-motion";
import DashboardLayout from "../components/layout/DashboardLayout";
import { fetchUserProfile } from "../utils/api";
import Avatar1 from "../assets/avatars/Avatar1.svg";

const Profile = () => {
  const [profile, setProfile] = React.useState(null);
  React.useEffect(() => {
    fetchUserProfile().then(setProfile);
  }, []);
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl mx-auto"
      >
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-transparent bg-clip-text">Profile</h2>
        <div className="flex flex-col items-center mb-4">
          <img
            src={profile?.profile?.avatar || Avatar1}
            alt="avatar"
            className="w-20 h-20 rounded-full border-2 border-[#1db954] bg-white/20 mb-2"
          />
          <div className="text-white/80">
            <p><span className="font-semibold">Name:</span> {profile?.profile?.firstName || "-"}</p>
            <p><span className="font-semibold">Email:</span> {profile?.email || "-"}</p>
            <p><span className="font-semibold">Goal:</span> ₹{profile?.goals?.savingsTarget || "-"}</p>
          </div>
        </div>
        <div className="text-white/60">Profile editing coming soon.</div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Profile; 