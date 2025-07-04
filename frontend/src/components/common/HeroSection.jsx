import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const phrases = [
  "AI-Powered Insights",
  "Tracking Expenses",
  "UPI Integration",
  "Smart Budgeting",
];

function useTypewriter(phrases, typingSpeed = 60, erasingSpeed = 40, pause = 1200) {
  const [display, setDisplay] = useState("");
  const [phase, setPhase] = useState("typing");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  useEffect(() => {
    let timeout;
    if (phase === "typing") {
      if (charIdx < phrases[phraseIdx].length) {
        timeout = setTimeout(() => setCharIdx(charIdx + 1), typingSpeed);
        setDisplay(phrases[phraseIdx].slice(0, charIdx + 1));
      } else {
        timeout = setTimeout(() => setPhase("erasing"), pause);
      }
    } else if (phase === "erasing") {
      if (charIdx > 0) {
        timeout = setTimeout(() => setCharIdx(charIdx - 1), erasingSpeed);
        setDisplay(phrases[phraseIdx].slice(0, charIdx - 1));
      } else {
        setPhase("typing");
        setPhraseIdx((phraseIdx + 1) % phrases.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [charIdx, phase, phraseIdx, phrases, typingSpeed, erasingSpeed, pause]);
  useEffect(() => { if (phase === "typing") setDisplay(phrases[phraseIdx].slice(0, charIdx)); }, [charIdx, phase, phraseIdx, phrases]);
  useEffect(() => { if (phase === "typing") setCharIdx(0); }, [phraseIdx, phase]);
  return display;
}

const HeroSection = () => {
  const typed = useTypewriter(phrases);
  return (
    <section className="relative min-h-[95vh] pt-24 flex flex-col md:flex-row items-center justify-center text-white bg-[#0a0f1c] overflow-hidden px-4 max-w-7xl mx-auto z-0">
      {/* Left Section */}
      <div className="flex-1 flex flex-col items-start justify-center max-w-xl z-10">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight mb-6 bg-gradient-to-r from-emerald-400 to-cyan-500 text-transparent bg-clip-text" style={{lineHeight:'1.15'}}>
          Take Control of Your Finances with
          <br />
          <span className="inline-block relative">
            <span className="text-white drop-shadow-lg">
              {typed}
              <span className="border-r-2 border-white animate-pulse ml-1" style={{height:'1em',display:'inline-block',verticalAlign:'middle'}}></span>
            </span>
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-lg shadow-sm">
          Track your UPI transactions, get smart investment advice, visualize your spending, and reach your financial goals — all in one place.
        </p>
        <Link to="/register">
          <button className="bg-gradient-to-r from-[#1db954] to-[#1e90ff] hover:from-[#1db954] hover:to-[#1e90ff] text-white font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 text-lg">
            Get started for Free
          </button>
        </Link>
      </div>
      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center w-full h-full relative min-h-[320px]">
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, -32, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, repeatType: "loop", ease: "easeInOut" }}
          className="flex items-center justify-center h-[75vh]"
          style={{ minHeight: '240px' }}
        >
          <svg width="1em" height="1em" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl" style={{ fontSize: '75vh', maxHeight: '75vh', maxWidth: '100%' }}>
            <defs>
              <linearGradient id="rupeeGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1db954" />
                <stop offset="100%" stopColor="#1e90ff" />
              </linearGradient>
            </defs>
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="120" fontWeight="bold" fill="url(#rupeeGradient)" style={{filter:'drop-shadow(0 4px 24px #1db95488)'}}>₹</text>
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
