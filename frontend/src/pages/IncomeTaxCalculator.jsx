import React, { useState, useRef } from 'react';
import { FaRupeeSign } from 'react-icons/fa';
import BubbleBackground from './BubbleBackground';

const taxSlabs = [
  { min: 0, max: 400000, rate: 0 },
  { min: 400001, max: 800000, rate: 0.05 },
  { min: 800001, max: 1200000, rate: 0.10 },
  { min: 1200001, max: 1600000, rate: 0.15 },
  { min: 1600001, max: 2000000, rate: 0.20 },
  { min: 2000001, max: 2400000, rate: 0.25 },
  { min: 2400001, max: Infinity, rate: 0.30 },
];

const articles = [
  {
    title: 'Income Tax Basics for Beginners',
    desc: 'Understand the fundamentals of income tax in India, including who needs to pay, how it is calculated, and key terms you should know.',
    tag: 'Beginner',
    link: '#',
  },
  {
    title: 'Latest Govt Tax Policies',
    desc: 'Stay updated with the latest government policies and changes in the Indian tax regime for the current financial year.',
    tag: 'Govt Policy',
    link: '#',
  },
  {
    title: 'Top 5 Tax Saving Tips',
    desc: 'Explore practical tips and strategies to save on your taxes legally and efficiently, tailored for Indian taxpayers.',
    tag: 'Tips',
    link: '#',
  },
  {
    title: 'Filing Your Tax Returns Online',
    desc: 'A step-by-step guide to filing your income tax returns online, including required documents and common mistakes to avoid.',
    tag: 'Beginner',
    link: '#',
  },
  {
    title: 'Understanding Tax Slabs',
    desc: 'A deep dive into how tax slabs work in India and how they impact your total tax liability.',
    tag: 'Beginner',
    link: '#',
  },
  {
    title: 'Freelancer Tax Guide',
    desc: 'Special considerations and tips for freelancers and gig workers to manage their taxes effectively.',
    tag: 'Tips',
    link: '#',
  },
];

function calculateTax(income) {
  let tax = 0;
  let remaining = income;
  for (let i = 0; i < taxSlabs.length; i++) {
    const { min, max, rate } = taxSlabs[i];
    if (income > min) {
      const taxable = Math.min(remaining, max - min + (i === 0 ? 1 : 0));
      tax += taxable * rate;
      remaining -= taxable;
      if (remaining <= 0) break;
    }
  }
  return Math.round(tax);
}

const IncomeTaxCalculator = () => {
  const [income, setIncome] = useState('');
  const [profession, setProfession] = useState('Salaried');
  const [tax, setTax] = useState(null);
  const [error, setError] = useState('');
  const [showResult, setShowResult] = useState(false);
  const resultRef = useRef(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    setError('');
    setShowResult(false);
    let numIncome = parseFloat(income);
    if (isNaN(numIncome) || numIncome <= 0) {
      setTax(null);
      setError('Please enter a valid annual income in LPA.');
      return;
    }
    const incomeInRupees = numIncome * 100000;
    const calculatedTax = calculateTax(incomeInRupees);
    setTax(calculatedTax);
    setShowResult(true);
  };

  return (
    <div className="relative min-h-screen w-full h-auto pb-6 bg-gradient-to-br from-[#e0e7ff] to-[#f0f4ff] dark:from-gray-900 dark:to-gray-800 overflow-x-hidden flex items-center justify-center">
      <BubbleBackground />
      {/* HERO SECTION */}
      <section className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mx-auto px-4 md:px-0 gap-4 md:gap-12 relative z-10 min-h-[80vh] md:min-h-[90vh] h-auto w-full min-w-0 pt-24">
        {/* Input Form */}
        <form
          onSubmit={handleCalculate}
          className="flex-1 bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-lg p-4 md:p-8 flex flex-col gap-6 w-full min-w-0 animate-fade-in-up break-words max-w-md"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-transparent bg-clip-text mb-4">Income Tax Calculator (FY 2025-26)</h1>
          <label className="font-semibold text-gray-700 dark:text-gray-200">Enter your Annual Income (in LPA)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={income}
            onChange={e => setIncome(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#1db954] bg-white/90 dark:bg-gray-800/90 text-white placeholder-gray-300"
            placeholder="e.g. 10"
          />
          <label className="font-semibold text-gray-700 dark:text-gray-200">Profession</label>
          <div className="flex flex-wrap gap-4 mb-2">
            {['Salaried', 'Self-employed', 'Freelancer', 'Business Owner'].map(opt => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="profession"
                  value={opt}
                  checked={profession === opt}
                  onChange={e => setProfession(e.target.value)}
                  className="accent-[#1db954]"
                />
                <span className="text-gray-700 dark:text-gray-200">{opt}</span>
              </label>
            ))}
          </div>
          <button
            type="submit"
            className="mt-4 bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-white font-bold py-3 px-8 rounded-lg shadow hover:scale-105 hover:shadow-lg transition-all duration-300 text-lg"
          >
            Calculate Tax
          </button>
          {error && <div className="mt-2 text-red-600 font-semibold animate-fade-in">{error}</div>}
        </form>
        {/* Output Card */}
        <div
          ref={resultRef}
          className="flex-1 flex flex-col items-center justify-center w-full min-w-0 animate-fade-in-up break-words max-w-md"
        >
          <div className="bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl p-4 md:p-8 w-full mt-8 md:mt-0 transition-transform duration-300 hover:scale-105 border border-transparent hover:border-[#1db954] break-words">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
              <FaRupeeSign className="text-[#1db954]" /> Tax Payable
            </h2>
            {tax !== null && showResult ? (
              <div className="text-3xl font-extrabold text-[#1db954] mb-2">💰 Your estimated tax is: ₹{tax.toLocaleString('en-IN')}</div>
            ) : (
              <div className="text-lg text-gray-500 mb-2">Enter your income and calculate to see your tax.</div>
            )}
            <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              <span className="font-semibold">Regime:</span> New Regime (FY 2025-26)
            </div>
            <div className="mt-4 overflow-x-auto w-full">
              <table className="w-full min-w-[340px] text-xs text-left text-gray-700 dark:text-gray-300 border-collapse">
                <thead>
                  <tr className="bg-[#1db954]/10 dark:bg-[#1db954]/20">
                    <th className="px-2 py-1 font-semibold">Income Slab (₹)</th>
                    <th className="px-2 py-1 font-semibold">Tax Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="px-2 py-1">0 – 4,00,000</td>
                    <td className="px-2 py-1">0%</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="px-2 py-1">4,00,001 – 8,00,000</td>
                    <td className="px-2 py-1">5%</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="px-2 py-1">8,00,001 – 12,00,000</td>
                    <td className="px-2 py-1">10%</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="px-2 py-1">12,00,001 – 16,00,000</td>
                    <td className="px-2 py-1">15%</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="px-2 py-1">16,00,001 – 20,00,000</td>
                    <td className="px-2 py-1">20%</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="px-2 py-1">20,00,001 – 24,00,000</td>
                    <td className="px-2 py-1">25%</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1">24,00,001+</td>
                    <td className="px-2 py-1">30%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {tax !== null && showResult && (
              <div className="text-xs text-gray-500 mt-4">Formula: Tax = Σ (Taxable Income in each slab × Rate)</div>
            )}
          </div>
        </div>
      </section>
      <style>{`
        .animate-fade-in-up { animation: fadeInUp 1s ease both; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  );
};

export default IncomeTaxCalculator; 