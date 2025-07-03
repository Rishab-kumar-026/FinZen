import React from "react";

const FeatureCard = ({ icon, title, description, className = "" }) => (
  <div
    className={`p-6 rounded-2xl bg-white/90 dark:bg-gray-900/80 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-[#1db954] border border-transparent flex flex-col items-center text-center min-h-[260px] ${className}`}
  >
    <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#1db954] to-[#1e90ff] text-white shadow-lg">
      {icon}
    </div>
    <h3 className="font-semibold text-xl md:text-2xl mb-2 text-gray-900 dark:text-white">{title}</h3>
    <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
  </div>
);

export default FeatureCard; 