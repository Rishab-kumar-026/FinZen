import { Routes, Route, useLocation } from "react-router-dom";  
import { AuthProvider, useAuth } from "./context/AuthContext";
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import SpendingCoachPage from './pages/SpendingCoach';
import MicroInvestorGuidePage from './pages/MicroInvestorGuide';
import LoanEligibilityPage from './pages/LoanEligibility';
import Resources from './pages/Resources';
import Onboarding from './pages/Onboarding';
import ExploreLearning from './pages/ExploreLearning';
import { AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Navbar from './components/common/Navbar';
import IncomeTaxCalculator from './pages/IncomeTaxCalculator';
import LoanEstimator from './pages/LoanEstimator';
import LimitBudget from './pages/LimitBudget';
import { CategoryProgressProvider } from './context/CategoryProgressContext';
import SetGoals from './pages/SetGoals';
// ...



// Placeholder components for new routes
const ExploreSpendingCoach = () => (
  <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 pt-24">
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-transparent bg-clip-text mb-6">
          Spending Coach
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Get personalized advice to optimize your spending and achieve your financial goals.
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
        <p className="text-gray-600 dark:text-gray-300 text-center">
          This feature is coming soon! You'll be able to get AI-powered spending advice and personalized recommendations.
        </p>
      </div>
    </div>
  </div>
);

const ExploreLoanEstimator = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 pt-24">
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-transparent bg-clip-text mb-6">
          Loan Estimator
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Calculate your loan eligibility and get personalized loan recommendations.
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
        <p className="text-gray-600 dark:text-gray-300 text-center">
          This feature is coming soon! You'll be able to estimate loan amounts, calculate EMIs, and check eligibility.
        </p>
      </div>
    </div>
  </div>
);

const Chatbot = () => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 pt-24">
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-transparent bg-clip-text mb-6">
          AI Financial Assistant
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Get instant answers to your financial questions and personalized advice.
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
        <p className="text-gray-600 dark:text-gray-300 text-center">
          This feature is coming soon! You'll be able to chat with our AI assistant for financial advice and guidance.
        </p>
      </div>
    </div>
  </div>
);

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/explore/spending-coach" element={<ExploreSpendingCoach />} />
        <Route path="/explore/income-tax-calculator" element={<IncomeTaxCalculator />} />
        <Route path="/explore/learning" element={<ExploreLearning />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/limit-budget" element={<LimitBudget />} />
        <Route path="/dashboard/spending-coach" element={<SpendingCoachPage />} />
        <Route path="/dashboard/micro-investor" element={<MicroInvestorGuidePage />} />
        <Route path="/dashboard/loan-eligibility" element={<LoanEligibilityPage />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/explore/loan-estimator" element={<LoanEstimator />} />
        <Route path="/set-goals" element={<SetGoals />} />
      </Routes>
    </AnimatePresence>
  );
}

function AppContent() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const handler = () => setShowOnboarding(true);
    window.addEventListener('openOnboarding', handler);
    return () => window.removeEventListener('openOnboarding', handler);
  }, []);

  // Inject chat widget only if logged in
  useEffect(() => {
    const scriptId = 'omnidimension-web-widget';
    if (isLoggedIn) {
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.async = true;
        script.src = 'https://backend.omnidim.io/web_widget.js?secret_key=e5fac8d1d091a10aa2b7719ea85af890';
        document.body.appendChild(script);
      }
    } else {
      const existing = document.getElementById(scriptId);
      if (existing) existing.remove();
    }
  }, [isLoggedIn]);

  return (
    <>
      <Navbar />
      {showOnboarding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-2xl mx-auto">
            <Onboarding onFinish={() => setShowOnboarding(false)} />
          </div>
        </div>
      )}
      <AnimatedRoutes />
    </>
  );
}

function App() {
  return (
    <CategoryProgressProvider>
      <AppContent />
    </CategoryProgressProvider>
  );
}

export default App;
