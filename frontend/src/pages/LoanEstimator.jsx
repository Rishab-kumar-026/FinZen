import React, { useState } from 'react';
import BubbleBackground from './BubbleBackground';
import { FaInfoCircle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const BANKS = [
  {
    name: 'HDFC Bank',
    logo: 'https://imgs.search.brave.com/HmboY34kuJiEmDVjBwdbhMW1l32xare_QSTLIbmhUuM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZTMubW91dGhzaHV0/LmNvbS9pbWFnZXMv/aW1hZ2VzcC85MjUw/MDQ1MDFzLnBuZw',
    tagline: 'Fast approval, minimal documents',
    interest: 9.5,
    link: 'https://www.hdfcbank.com/personal/borrow/popular-loans/personal-loan',
  },
  {
    name: 'ICICI Bank',
    logo: 'https://imgs.search.brave.com/qthbYmWzRlZGkLIybfw0vxb-grm020YoLUjaggiFEOg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/ZGl4LmNvbS9sb2dv/LzIyMDY0NjMucG5n',
    tagline: 'Flexible tenure, quick disbursal',
    interest: 10.2,
    link: 'https://www.icicibank.com/personal-banking/loans/personal-loan',
  },
  {
    name: 'Axis Bank',
    logo: 'https://imgs.search.brave.com/kjOS3EAauefI0gSnDnElEuFc9h4U5cxuUZJdoYq_9gA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2MyL2Nl/LzE1L2MyY2UxNWE5/OGJmZDk4NjkxNjQ3/NmQ1YmM1NjEwZWIw/LmpwZw',
    tagline: 'Low interest, easy process',
    interest: 10.5,
    link: 'https://www.axisbank.com/retail/loans/personal-loan',
  },
  {
    name: 'SBI',
    logo: 'https://imgs.search.brave.com/q6cqeFNvG5FJrDo9oH4jBbHXTtHaEB-ne9V4HvlXq7A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nZ3VydS5pbi9z/dG9yYWdlL3VwbG9h/ZHMvaW1hZ2VzL3Ni/aS1sb2dvLXBuZy1m/cmVlLXNiaS1iYW5r/LWxvZ28tcG5nLXdp/dGgtdHJhbnNwYXJl/bnQtYmFja2dyb3Vu/ZF8xNzIxMzc3NjMw/XzE5NDk5NTMzODcu/d2VicA',
    tagline: 'Trusted by millions',
    interest: 9.9,
    link: 'https://www.sbi.co.in/web/personal-banking/loans/personal-loans',
  },
  {
    name: 'Kotak Mahindra',
    logo: 'https://imgs.search.brave.com/klPsgfgDDS_9re8EfilgnDUjUaVpU0cyEuX3zjBG4Dk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzMwLzEva290YWst/bWFoaW5kcmEtYmFu/ay1sb2dvLXBuZ19z/ZWVrbG9nby0zMDQy/MjAucG5n',
    tagline: 'Quick approval, low EMI',
    interest: 10.0,
    link: 'https://www.kotak.com/en/personal-banking/loans/personal-loan.html',
  },
];

const TENURE_OPTIONS = [
  { label: '6 months', value: 6 },
  { label: '1 year', value: 12 },
  { label: '2 years', value: 24 },
  { label: '5 years', value: 60 },
];

function calculateEMI(P, annualRate, N) {
  const R = annualRate / 12 / 100;
  if (R === 0) return Math.round(P / N);
  const emi = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
  return Math.round(emi);
}

function getDTI(emi, income) {
  if (!income) return 0;
  return ((emi / income) * 100).toFixed(1);
}

const LoanEstimator = () => {
  // Prefill with mock user data (simulate logged-in user)
  const [loanAmount, setLoanAmount] = useState('');
  const [tenure, setTenure] = useState(12);
  const [income, setIncome] = useState(60000);
  const [expenses, setExpenses] = useState(30000);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // Derived
  const savings = income - expenses;

  const handleCheckEligibility = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    if (!loanAmount || !tenure || !income || !expenses) {
      setError('Please fill all fields.');
      return;
    }
    if (loanAmount <= 0 || income <= 0 || expenses < 0) {
      setError('Please enter valid positive numbers.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      // Pick the lowest interest rate for eligibility calculation
      const bestBank = BANKS.reduce((a, b) => (a.interest < b.interest ? a : b));
      const emi = calculateEMI(Number(loanAmount), bestBank.interest, Number(tenure));
      const dti = getDTI(emi, income);
      // Simple eligibility: DTI < 40%, savings > emi, and savings > 10% of income
      const eligible = dti < 40 && savings > emi && savings > income * 0.1;
      setResult({
        eligible,
        emi,
        dti,
        banks: BANKS.map(bank => ({
          ...bank,
          emi: calculateEMI(Number(loanAmount), bank.interest, Number(tenure)),
        })),
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#e0e7ff] to-[#f0f4ff] dark:from-gray-900 dark:to-gray-800 overflow-x-hidden flex items-center justify-center">
      <BubbleBackground />
      <section className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl mx-auto px-2 sm:px-4 gap-4 md:gap-12 relative z-10 min-h-screen pt-20 md:pt-32 pb-16 hide-scrollbar w-full min-w-0">
        {/* Left: Form */}
        <form
          onSubmit={handleCheckEligibility}
          className="flex-1 bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-lg p-4 md:p-8 flex flex-col gap-6 w-full min-w-0 animate-fade-in-up justify-center h-full break-words"
        >
          <h1 className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-transparent bg-clip-text mb-2">Loan Estimator</h1>
          <label className="font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
            Loan Amount (₹)
            <FaInfoCircle title="The amount you wish to borrow" className="text-gray-400 cursor-pointer" />
          </label>
          <input
            type="number"
            min="10000"
            step="1000"
            value={loanAmount}
            onChange={e => setLoanAmount(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#1db954] bg-white/90 dark:bg-gray-800/90 text-white placeholder-gray-300"
            placeholder="e.g. 200000"
          />
          <label className="font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
            Loan Tenure
            <FaInfoCircle title="How long you want to repay the loan" className="text-gray-400 cursor-pointer" />
          </label>
          <select
            value={tenure}
            onChange={e => setTenure(Number(e.target.value))}
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#1db954] bg-white/90 dark:bg-gray-800/90 text-white"
          >
            {TENURE_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <label className="font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
            Monthly Income (₹)
            <FaInfoCircle title="Your average monthly income" className="text-gray-400 cursor-pointer" />
          </label>
          <input
            type="number"
            min="0"
            value={income}
            onChange={e => setIncome(Number(e.target.value))}
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#1db954] bg-white/90 dark:bg-gray-800/90 text-white placeholder-gray-300"
            placeholder="e.g. 60000"
          />
          <label className="font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
            Monthly Expenses (₹)
            <FaInfoCircle title="Your average monthly expenses" className="text-gray-400 cursor-pointer" />
          </label>
          <input
            type="number"
            min="0"
            value={expenses}
            onChange={e => setExpenses(Number(e.target.value))}
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#1db954] bg-white/90 dark:bg-gray-800/90 text-white placeholder-gray-300"
            placeholder="e.g. 30000"
          />
          <button
            type="submit"
            className="mt-4 bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-white font-bold py-3 px-8 rounded-lg shadow hover:scale-105 hover:shadow-lg transition-all duration-300 text-lg flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading && <span className="loader border-t-2 border-b-2 border-white rounded-full w-5 h-5 mr-2 animate-spin"></span>}
            Check Loan Eligibility
          </button>
          {error && <div className="mt-2 text-red-600 font-semibold animate-fade-in">{error}</div>}
        </form>
        {/* Right: Output */}
        <div className="flex-1 flex flex-col items-center justify-center w-full min-w-0 animate-fade-in-up h-full break-words">
          {/* Summary Card */}
          <div className="bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl p-4 md:p-6 w-full mb-6">
            <div className="flex flex-wrap gap-4 justify-between items-center mb-2">
              <div className="flex flex-col"><span className="text-xs text-gray-500">Income</span><span className="font-bold text-lg text-[#1db954]">₹{income.toLocaleString('en-IN')}</span></div>
              <div className="flex flex-col"><span className="text-xs text-gray-500">Expenses</span><span className="font-bold text-lg text-red-500">₹{expenses.toLocaleString('en-IN')}</span></div>
              <div className="flex flex-col"><span className="text-xs text-gray-500">Savings</span><span className="font-bold text-lg text-blue-500">₹{savings.toLocaleString('en-IN')}</span></div>
            </div>
            {result && (
              <div className="flex flex-wrap gap-4 justify-between items-center mt-2">
                <div className="flex flex-col"><span className="text-xs text-gray-500">Loan EMI</span><span className="font-bold text-lg text-[#1e90ff]">₹{result.emi.toLocaleString('en-IN')}</span></div>
                <div className="flex flex-col"><span className="text-xs text-gray-500 flex items-center gap-1">DTI <FaInfoCircle title="Debt-to-Income Ratio" className="inline text-gray-400" /></span><span className="font-bold text-lg text-purple-500">{result.dti}%</span></div>
                <div className="flex flex-col items-center"><span className="text-xs text-gray-500">Status</span>{result.eligible ? <FaCheckCircle className="text-green-500 text-2xl" /> : <FaTimesCircle className="text-red-500 text-2xl" />}</div>
              </div>
            )}
          </div>
          {/* Output Section */}
          {result && (
            <div className="w-full">
              {result.eligible ? (
                <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-xl p-5 mb-6 text-green-800 dark:text-green-200 text-center animate-fade-in-up">
                  <div className="text-xl font-bold mb-2">You're eligible for a loan of ₹{Number(loanAmount).toLocaleString('en-IN')} over {tenure} months!</div>
                  <div className="text-sm mb-2">See the best offers below:</div>
                </div>
              ) : (
                <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-xl p-5 mb-6 text-red-800 dark:text-red-200 text-center animate-fade-in-up">
                  <div className="text-xl font-bold mb-2">Not eligible for this loan amount.</div>
                  <div className="text-sm mb-2">Based on your current income and spending, you're not eligible for this loan amount.</div>
                  <ul className="text-xs text-left mx-auto max-w-xs list-disc pl-5">
                    <li>Reduce loan amount</li>
                    <li>Improve savings consistency</li>
                    <li>Get <a href="/explore/learning" className="underline text-blue-600">financial advice</a></li>
                  </ul>
                </div>
              )}
              {/* Bank Cards */}
              {result.eligible && (
                <div className="flex flex-col gap-6 max-h-[320px] overflow-y-auto hide-scrollbar bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg shadow rounded-xl p-3 md:p-4">
                  {result.banks.sort((a, b) => a.interest - b.interest).slice(0, 4).map((bank, i) => (
                    <div key={bank.name} className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-3 md:p-5 flex flex-col gap-3 border border-gray-100 dark:border-gray-800 hover:scale-105 hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <img src={bank.logo} alt={bank.name} className="w-10 h-10 object-contain rounded-full bg-white border" />
                        <div>
                          <div className="font-bold text-lg text-gray-900 dark:text-white">{bank.name}</div>
                          <div className="text-xs text-gray-500">{bank.tagline}</div>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row md:flex-wrap gap-4 items-start md:items-center justify-between text-left md:text-center">
                        <div className="flex flex-col"><span className="text-xs text-gray-500">Interest Rate</span><span className="font-bold text-[#1db954]">{bank.interest}% APR</span></div>
                        <div className="flex flex-col"><span className="text-xs text-gray-500">Tenure</span><span className="font-bold text-white">{tenure} months</span></div>
                        <div className="flex flex-col"><span className="text-xs text-gray-500">EMI</span><span className="font-bold text-[#1e90ff]">₹{bank.emi.toLocaleString('en-IN')}</span></div>
                      </div>
                      <a
                        href={bank.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-white font-semibold py-2 px-5 rounded-lg shadow hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm text-center"
                      >
                        Contact Now
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      <style>{`
        .animate-fade-in-up { animation: fadeInUp 1s ease both; }
        .loader { border-width: 2px; border-style: solid; border-color: #fff #fff #1db954 #1db954; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default LoanEstimator; 