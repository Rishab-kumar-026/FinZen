import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-[95vh] pt-24 flex items-center justify-center text-white bg-[#0a0f1c] overflow-hidden px-6 z-0">
      {/* 🔥 Hero Content */}
      <div className="text-center max-w-3xl z-10">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-500 text-transparent bg-clip-text mb-6"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Take Control of Your Finances
          <br className="hidden sm:block" />
          with <span className="text-white">AI-Powered Insights</span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-gray-300 mb-8 px-2 sm:px-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Track your UPI transactions, get smart investment advice, visualize your
          spending, and reach your financial goals — all in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link to="/register">
            <button className="bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-emerald-500 hover:to-green-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
              Get Started for Free
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
