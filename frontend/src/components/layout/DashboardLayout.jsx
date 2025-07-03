import React from "react";
import AnimatedBackground from "../ui/AnimatedBackground";

const DashboardLayout = ({ children }) => (
  <div className="min-h-screen bg-[#0a0f1c] flex flex-col relative overflow-hidden">
    {/* Animated background for 3D/bubble effect */}
    <AnimatedBackground />
    {/* Main content area */}
    <main className="flex-1 w-full mx-auto px-2 sm:px-4 md:px-10 py-10 relative z-10">
      {children}
    </main>
  </div>
);

export default DashboardLayout; 