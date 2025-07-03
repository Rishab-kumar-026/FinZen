import React from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import SpendingCoach from "../components/dashboard/SpendingCoach";

const SpendingCoachPage = () => (
  <DashboardLayout>
    <div className="w-full flex justify-center px-2 pt-24 sm:px-4 py-8">
      <div className="w-full max-w-md mx-auto">
        <SpendingCoach />
      </div>
    </div>
  </DashboardLayout>
);

export default SpendingCoachPage; 