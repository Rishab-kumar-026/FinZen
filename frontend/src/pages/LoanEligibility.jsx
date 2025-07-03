import React from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import LoanEligibilityDesk from "../components/dashboard/LoanEligibilityDesk";

const LoanEligibilityPage = () => (
  <DashboardLayout>
    <div className="w-full flex justify-center pt-24 px-2 sm:px-4 py-8">
      <div className="w-full max-w-md mx-auto">
        <LoanEligibilityDesk />
      </div>
    </div>
  </DashboardLayout>
);

export default LoanEligibilityPage; 