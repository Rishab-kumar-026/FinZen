import React from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import MicroInvestorGuide from "../components/dashboard/MicroInvestorGuide";

const MicroInvestorGuidePage = () => (
  <DashboardLayout>
    <div className="w-full flex justify-center pt-24px-2 sm:px-4 py-8">
      <div className="w-full max-w-md mx-auto">
        <MicroInvestorGuide />
      </div>
    </div>
  </DashboardLayout>
);

export default MicroInvestorGuidePage; 