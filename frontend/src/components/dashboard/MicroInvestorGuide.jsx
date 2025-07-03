import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchPortfolio, tradePortfolio } from "../../utils/api";
import { FaPiggyBank, FaChartLine, FaCoins, FaLightbulb, FaCheckCircle } from 'react-icons/fa';

const STEPS = [
  {
    icon: <FaPiggyBank className="text-[#1db954] text-3xl" />, title: 'What is Micro-Investing?',
    desc: 'Micro-investing lets you start investing with as little as ₹100. It\'s about building wealth, one small step at a time.'
  },
  {
    icon: <FaCoins className="text-[#1e90ff] text-3xl" />, title: 'Start Small, Start Now',
    desc: 'You don\'t need a lot to begin. Invest spare change or small amounts regularly to grow your portfolio.'
  },
  {
    icon: <FaChartLine className="text-yellow-400 text-3xl" />, title: 'Diversify',
    desc: 'Spread your investments across different assets (stocks, gold, funds) to reduce risk.'
  },
  {
    icon: <FaLightbulb className="text-pink-400 text-3xl" />, title: 'Track & Learn',
    desc: 'Monitor your returns and learn from market trends. Consistency is key.'
  },
  {
    icon: <FaCheckCircle className="text-green-400 text-3xl" />, title: 'Avoid Common Mistakes',
    desc: 'Don\'t panic-sell, avoid "get rich quick" schemes, and always do your research.'
  },
];

const TIPS = [
  'Investing early, even with small amounts, can lead to big gains over time.',
  'Reinvest your returns to maximize compounding.',
  'Set clear goals and review your progress monthly.',
  'Don\'t put all your eggs in one basket—diversify!',
  'Stay patient. Wealth building is a marathon, not a sprint.'
];

const MicroInvestorGuide = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [asset, setAsset] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [tradeMsg, setTradeMsg] = useState("");
  const [stepIdx, setStepIdx] = useState(0);
  const [showSimModal, setShowSimModal] = useState(false);
  const [simAmount, setSimAmount] = useState('');
  const [simYears, setSimYears] = useState('');
  const [simResult, setSimResult] = useState(null);
  const [tipIdx, setTipIdx] = useState(0);

  useEffect(() => {
    loadPortfolio();
  }, []);

  const loadPortfolio = async () => {
    setLoading(true);
    const data = await fetchPortfolio();
    setPortfolio(data);
    setLoading(false);
  };

  const handleTrade = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTradeMsg("");
    const res = await tradePortfolio(asset, Number(amount));
    if (res && res.success) {
      setTradeMsg(res.message);
      setPortfolio(res.portfolio);
      setShowModal(false);
      setAsset("");
      setAmount("");
    } else {
      setTradeMsg("Trade failed. Try again.");
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative   rounded-3xl py-10 shadow-2xl mb-12 backdrop-blur-xl max-w-5xl mx-auto w-full flex flex-col gap-10"
    >
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row md:items-center gap-8 mb-8">
        <motion.div
          initial={{ scale: 0.9, rotate: -8 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 8 }}
          className="flex-shrink-0"
        >
          <FaPiggyBank size={72} className="text-[#1db954] drop-shadow-2xl" />
        </motion.div>
        <div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-transparent bg-clip-text mb-2">Start Your Micro-Investing Journey</h3>
          <p className="text-white/80 text-lg">Learn how to grow your wealth, one small investment at a time. No experience needed!</p>
        </div>
      </div>
      {/* Step-by-step Guide */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-stretch justify-center">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: stepIdx === idx ? 1 : 0.5, y: stepIdx === idx ? 0 : 30, scale: stepIdx === idx ? 1.05 : 1 }}
              transition={{ duration: 0.5 }}
              className={`flex-1 min-w-[180px] max-w-xs p-6 rounded-2xl bg-white/20 border border-white/10 shadow-lg flex flex-col items-center gap-3 cursor-pointer transition-all ${stepIdx === idx ? 'ring-2 ring-[#1db954]/60' : ''}`}
              onClick={() => setStepIdx(idx)}
            >
              {step.icon}
              <h4 className="text-lg font-bold bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-transparent bg-clip-text text-center">{step.title}</h4>
              <p className="text-white/70 text-center text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {STEPS.map((_, idx) => (
            <button key={idx} className={`w-3 h-3 rounded-full ${stepIdx === idx ? 'bg-[#1db954]' : 'bg-white/30'} transition-all`} onClick={() => setStepIdx(idx)} />
          ))}
        </div>
      </div>
      {/* Simulate Returns Card */}
      <div className="mb-8 flex flex-col md:flex-row gap-8 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 max-w-md bg-white/20 border border-white/10 rounded-2xl p-6 shadow-lg"
        >
          <h4 className="text-xl font-bold bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-transparent bg-clip-text mb-2 flex items-center gap-2"><FaChartLine className="text-[#1e90ff]" /> Simulate Returns</h4>
          <form className="flex flex-col gap-3" onSubmit={e => {
            e.preventDefault();
            // SIP (recurring investment) formula
            const P = Number(simAmount); // monthly investment
            const years = Number(simYears);
            const n = years * 12;
            const annualRate = 0.12; // 12% annual
            const r = annualRate / 12; // monthly rate
            // FV = P * [((1 + r)^n - 1) / r]
            const result = P * ((Math.pow(1 + r, n) - 1) / r);
            setSimResult({ principal: P, years, result: Math.round(result), n });
          }}>
            <input
              type="number"
              placeholder="Amount to invest (₹)"
              className="w-full px-4 py-2 rounded-lg bg-[#181f2e] border border-white/20 text-white text-lg font-semibold focus:outline-none"
              value={simAmount}
              onChange={e => setSimAmount(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Years to invest"
              className="w-full px-4 py-2 rounded-lg bg-[#181f2e] border border-white/20 text-white text-lg font-semibold focus:outline-none"
              value={simYears}
              onChange={e => setSimYears(e.target.value)}
              required
            />
            <button type="submit" className="px-6 py-2 rounded-full bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-white font-semibold shadow hover:scale-105">Simulate</button>
          </form>
          {simResult && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-4 rounded-xl bg-white/10 text-white/90 text-center font-semibold shadow">
              If you invest <span className="text-[#1db954]">₹{simResult.principal}</span> every month for <span className="text-[#1e90ff]">{simResult.years} years</span>,<br />you could have <span className="text-yellow-300 text-xl">₹{simResult.result}</span> (at 12% annual return)
            </motion.div>
          )}
        </motion.div>
        {/* Mock Investment Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-1 max-w-md bg-white/20 border border-white/10 rounded-2xl p-6 shadow-lg flex flex-col items-center"
        >
          <h4 className="text-xl font-bold bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-transparent bg-clip-text mb-2 flex items-center gap-2"><FaCoins className="text-[#1db954]" /> Try a Mock Investment</h4>
          <button className="px-6 py-2 rounded-full bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-white font-semibold shadow hover:scale-105" onClick={() => setShowSimModal(true)}>Invest Now</button>
        </motion.div>
      </div>
      {/* Tips Carousel */}
      <div className="mb-4 flex flex-col items-center">
        <motion.div
          key={tipIdx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-white/20 border border-white/10 rounded-2xl px-6 py-4 text-lg text-white/90 shadow-lg max-w-xl text-center"
        >
          {TIPS[tipIdx]}
        </motion.div>
        <div className="flex gap-2 mt-3">
          {TIPS.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full ${tipIdx === idx ? 'bg-[#1db954]' : 'bg-white/30'} transition-all`}
              onClick={() => setTipIdx(idx)}
            />
          ))}
        </div>
      </div>
      {/* Mock Investment Modal */}
      <AnimatePresence>
        {showSimModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/10 border border-white/10 rounded-2xl p-8 shadow-2xl w-full max-w-md text-white backdrop-blur-xl flex flex-col items-center"
            >
              <h4 className="text-2xl font-bold mb-4 flex items-center gap-2 bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-transparent bg-clip-text"><FaCoins className="text-[#1db954]" /> Mock Investment</h4>
              <p className="mb-4 text-white/80">Congrats! You just invested <span className="text-[#1db954] font-bold">₹500</span> in a mock asset. 🎉<br />Track your investments regularly to build wealth!</p>
              <button className="px-6 py-2 rounded-full bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-white font-semibold shadow hover:scale-105" onClick={() => setShowSimModal(false)}>Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MicroInvestorGuide; 