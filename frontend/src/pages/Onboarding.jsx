import React, { useState } from "react";
import AnimatedBackground from "../components/ui/AnimatedBackground";
import { FaGooglePay, FaPhone, FaUniversity, FaPiggyBank, FaUtensils, FaShoppingCart, FaBus, FaBolt, FaSmile } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';
import { updateUserProfile, addTransaction } from '../utils/api';

const UPI_APPS = [
  { name: "Google Pay", icon: <FaGooglePay size={32} className="text-[#1db954] animate-bounce" /> },
  { name: "PhonePe", icon: <FaPhone size={32} className="text-[#1e90ff] animate-bounce" /> },
  { name: "Paytm", icon: <FaUniversity size={32} className="text-[#d1a6ff] animate-bounce" /> },
];

const CATEGORIES = [
  { name: "Groceries", icon: <FaShoppingCart /> },
  { name: "Dining Out", icon: <FaUtensils /> },
  { name: "Transport", icon: <FaBus /> },
  { name: "Utilities", icon: <FaBolt /> },
  { name: "Savings", icon: <FaPiggyBank /> },
];

const steps = [
  "UPI App Selection",
  "Financial Goals",
  "Spending Preferences",
  "Profile Completion",
  "First Transaction"
];

// Modern transition variants for steps
const stepVariants = {
  initial: { opacity: 0, x: 60, scale: 0.98 },
  animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, x: -60, scale: 0.98, transition: { duration: 0.4, ease: 'easeIn' } },
};

const Onboarding = ({ onFinish }) => {
  const [step, setStep] = useState(0);
  const [selectedUPI, setSelectedUPI] = useState([]);
  const [goal, setGoal] = useState(20000);
  const [categories, setCategories] = useState([]);
  const [profileComplete, setProfileComplete] = useState(false);
  const [skippedUPI, setSkippedUPI] = useState(false);
  const [firstTxn, setFirstTxn] = useState({
    title: '',
    amount: '',
    date: new Date().toISOString().slice(0, 10),
    category: '',
    type: 'expense',
  });
  const [txnLoading, setTxnLoading] = useState(false);
  const [txnError, setTxnError] = useState('');

  const handleUPISelect = (name) => {
    setSelectedUPI((prev) => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
  };
  const handleCategorySelect = (name) => {
    setCategories((prev) => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
  };
  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  // Gamified finish
  const finish = async () => {
    setProfileComplete(true);
    // Save onboarding data to backend for dashboard display
    const updates = {
      preferences: { upiApps: skippedUPI ? [] : selectedUPI },
      goals: { savingsTarget: goal },
      spendingCategories: { prioritized: categories },
      onboardingCompleted: true,
    };
    try {
      await updateUserProfile(updates);
    } catch (err) {
      // Optionally show error to user
      console.error('Failed to save onboarding data:', err);
    }
    setTimeout(() => {
      if (onFinish) onFinish();
      // Redirect or show dashboard link
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0f1c] pt-8 text-white overflow-y-auto flex items-center justify-center min-h-screen">
      <div className="absolute inset-0 -z-10">
        <AnimatedBackground />
      </div>
      <div className="w-full max-w-2xl mx-auto p-8 rounded-3xl bg-white/10 border border-white/20 shadow-2xl backdrop-blur-2xl flex flex-col justify-center min-h-[70vh] md:min-h-[60vh] gap-8 transition-all duration-500">
        {/* Progress Bar */}
        <div className="flex items-center mb-8">
          {steps.map((label, idx) => (
            <div key={label} className="flex-1 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg ${idx <= step ? 'bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-white shadow-lg' : 'bg-white/10 text-white/40'}`}>{idx + 1}</div>
              <span className={`text-xs mt-2 ${idx === step ? 'text-white' : 'text-white/50'}`}>{label}</span>
              {idx < steps.length - 1 && <div className={`h-1 w-full ${idx < step ? 'bg-gradient-to-r from-[#1db954] to-[#1e90ff]' : 'bg-white/10'}`}></div>}
            </div>
          ))}
        </div>
        {/* Step Content with modern transition and more spacing */}
        <AnimatePresence mode="wait">
          {!profileComplete && step === 0 && (
            <motion.div
              key="step-upi"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-center animate-fade-in flex flex-col gap-8"
            >
              <h2 className="text-3xl font-bold mb-4">Select Your UPI Apps</h2>
              <div className="flex justify-center gap-8 mb-8 flex-wrap">
                {UPI_APPS.map(app => (
                  <button
                    key={app.name}
                    className={`p-6 rounded-2xl border-2 transition-all text-white/90 text-lg flex flex-col items-center gap-2 shadow-md ${selectedUPI.includes(app.name) ? 'border-[#1db954] bg-white/10 scale-110' : 'border-white/10 bg-white/5'} hover:scale-105`}
                    onClick={() => handleUPISelect(app.name)}
                  >
                    {app.icon}
                    <div className="mt-2 text-base font-semibold">{app.name}</div>
                  </button>
                ))}
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <button className="px-8 py-2 rounded-full bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-white font-semibold shadow-lg hover:scale-105 transition-all" onClick={nextStep} disabled={selectedUPI.length === 0 && !skippedUPI}>Next</button>
                <button className="px-8 py-2 rounded-full bg-white/20 text-white font-semibold shadow hover:bg-white/30 transition-all" onClick={() => { setSkippedUPI(true); nextStep(); }}>Skip</button>
              </div>
            </motion.div>
          )}
          {!profileComplete && step === 1 && (
            <motion.div
              key="step-goal"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-center animate-fade-in flex flex-col gap-8"
            >
              <h2 className="text-3xl font-bold mb-4">Set Your Financial Goal</h2>
              <div className="flex flex-col items-center mb-6">
                <FaPiggyBank size={40} className="text-[#1db954] mb-2 animate-bounce" />
                <input
                  type="number"
                  min={1000}
                  step={500}
                  value={goal}
                  onChange={e => setGoal(Number(e.target.value))}
                  className="w-40 text-center px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#1db954]"
                />
                <span className="text-sm text-white/60 mt-2">Your savings goal (₹)</span>
              </div>
              <div className="flex justify-between">
                <button className="px-4 py-2 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20" onClick={prevStep}>Back</button>
                <button className="px-6 py-2 rounded-full bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-white font-semibold shadow hover:scale-105" onClick={nextStep}>Next</button>
              </div>
            </motion.div>
          )}
          {!profileComplete && step === 2 && (
            <motion.div
              key="step-categories"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-center animate-fade-in flex flex-col gap-8"
            >
              <h2 className="text-3xl font-bold mb-4">Spending Category Preferences</h2>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.name}
                    className={`flex flex-col items-center px-4 py-3 rounded-xl border-2 transition-all ${categories.includes(cat.name) ? 'border-[#1e90ff] bg-white/10 scale-110' : 'border-white/10 bg-white/5'} hover:scale-105`}
                    onClick={() => handleCategorySelect(cat.name)}
                  >
                    <span className="text-2xl mb-1">{cat.icon}</span>
                    <span className="text-sm font-semibold">{cat.name}</span>
                  </button>
                ))}
              </div>
              <div className="flex justify-between">
                <button className="px-4 py-2 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20" onClick={prevStep}>Back</button>
                <button className="px-6 py-2 rounded-full bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-white font-semibold shadow hover:scale-105" onClick={nextStep} disabled={categories.length === 0}>Next</button>
              </div>
            </motion.div>
          )}
          {!profileComplete && step === 3 && (
            <motion.div
              key="step-complete"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-center animate-fade-in flex flex-col gap-8"
            >
              <h2 className="text-3xl font-bold mb-4 text-[#1db954]">Profile Completion</h2>
              <div className="flex flex-col items-center mb-6">
                <FaSmile size={40} className="text-yellow-400 mb-2 animate-bounce" />
                <div className="w-full bg-white/10 rounded-full h-4 mt-4 mb-2">
                  <div className="bg-gradient-to-r from-[#1db954] to-[#1e90ff] h-4 rounded-full transition-all" style={{ width: '100%' }}></div>
                </div>
                <span className="text-lg font-semibold text-white/80">All steps complete!</span>
              </div>
              <button className="mt-4 px-8 py-2 rounded-full bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-white font-semibold shadow hover:scale-105" onClick={finish}>Finish</button>
            </motion.div>
          )}
          {!profileComplete && step === 4 && (
            <motion.div
              key="step-first-txn"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-center animate-fade-in flex flex-col gap-8"
            >
              <h2 className="text-3xl font-bold mb-4">Add Your First Transaction</h2>
              <form className="flex flex-col gap-4 items-center" onSubmit={async (e) => {
                e.preventDefault();
                setTxnLoading(true);
                setTxnError('');
                try {
                  await addTransaction({
                    ...firstTxn,
                    amount: Number(firstTxn.amount),
                  });
                  setProfileComplete(true);
                } catch (err) {
                  setTxnError('Failed to add transaction.');
                }
                setTxnLoading(false);
              }}>
                {/* Type Dropdown */}
                <select
                  className="w-full px-4 py-3 rounded-lg bg-[#181f2e] border border-white/20 text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#1db954] transition-all placeholder-white/60 appearance-none"
                  value={firstTxn.type}
                  onChange={e => setFirstTxn({ ...firstTxn, type: e.target.value })}
                  required
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
                {/* Category Dropdown */}
                <select
                  className="w-full px-4 py-3 rounded-lg bg-[#181f2e] border border-white/20 text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#1db954] transition-all placeholder-white/60 appearance-none"
                  value={firstTxn.category}
                  onChange={e => setFirstTxn({ ...firstTxn, category: e.target.value })}
                  required
                >
                  <option value="" disabled>Select Category</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
                <input
                  type="date"
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-lg font-semibold focus:outline-none"
                  value={firstTxn.date}
                  onChange={e => setFirstTxn({ ...firstTxn, date: e.target.value })}
                  required
                />
                <input
                  type="number"
                  placeholder="Amount (₹)"
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-lg font-semibold focus:outline-none"
                  value={firstTxn.amount}
                  onChange={e => setFirstTxn({ ...firstTxn, amount: e.target.value })}
                  required
                />
                {txnError && <div className="text-red-400 text-sm">{txnError}</div>}
                <button
                  type="submit"
                  className="mt-2 px-8 py-2 rounded-full bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-white font-semibold shadow hover:scale-105 disabled:opacity-60"
                  disabled={txnLoading}
                >
                  {txnLoading ? 'Saving...' : 'Add Transaction & Finish'}
                </button>
              </form>
            </motion.div>
          )}
          {profileComplete && (
            <motion.div
              key="step-done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="text-center animate-fade-in"
            >
              <h2 className="text-3xl font-bold mb-4 text-[#1db954]">🎉 Onboarding Complete!</h2>
              <p className="mb-6 text-white/80">Welcome to FinZen! Your profile is set up and you're ready to start your financial journey.</p>
              <a href="/dashboard" className="inline-block px-8 py-2 rounded-full bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-white font-semibold shadow hover:scale-105">Go to Dashboard</a>
              {/* Confetti or animation can be added here */}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;