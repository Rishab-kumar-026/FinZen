import { motion } from "framer-motion";
import {
  FaChartPie, FaTachometerAlt, FaRobot, FaCalculator, FaBookOpen, FaMobileAlt, FaSlidersH, FaBell, FaFileInvoiceDollar, FaUserCheck
} from "react-icons/fa";
import AnimatedBackground from "../ui/AnimatedBackground";

const features = [
  {
    icon: <FaTachometerAlt size={44} />,
    title: "Expense Tracking",
    desc: "Track daily, weekly, and monthly expenses with ease. Automatically categorize your spending and gain insights into your financial habits for smarter decision-making.",
  },
  {
    icon: <FaMobileAlt size={44} />,
    title: "UPI Integration",
    desc: "Seamlessly track spending across your UPI transactions. Get real-time insights and notifications for every transaction.",
  },
  {
    icon: <FaChartPie size={44} />,
    title: "Visual Dashboard",
    desc: "Get a clean and intuitive visual overview of your income, savings, expenses, and goals — all in one customizable dashboard.",
  },
  {
    icon: <FaRobot size={44} />,
    title: "AI Chatbot Advisor",
    desc: "A smart chatbot that provides financial tips, answers queries, and helps you stay on top of your money management game in real time.",
  },
  {
    icon: <FaCalculator size={44} />,
    title: "Loan Estimator",
    desc: "Find out if you're loan-eligible based on your income and expenses. Get projections on EMI and repayment capacity instantly.",
  },
  {
    icon: <FaBookOpen size={44} />,
    title: "Learn to Invest",
    desc: "Access beginner-friendly courses and articles on mutual funds, SIPs, stocks, and more. Make your money work for you.",
  },
 ,
  {
    icon: <FaSlidersH size={44} />,
    title: "Limit Expenses",
    desc: "Set category-based spending limits and stay notified when you approach them. Take full control of your budget.",
  },
  {
    icon: <FaFileInvoiceDollar size={44} />,
    title: "Income Tax Calculator",
    desc: "Enter your salary and profession to estimate how much tax you owe in seconds. Tailored advice included.",
  },
  {
    icon: <FaUserCheck size={44} />,
    title: "Smart Spending Coach",
    desc: "A proactive assistant that gives weekly financial health tips, spending feedback, and suggestions to optimize your lifestyle.",
  },
];

const FeatureSection = () => {
  return (
    <section className="relative py-16 md:py-20 text-gray-900 dark:text-white overflow-hidden">
      {/* Bubble background behind the entire section */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <AnimatedBackground />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-transparent bg-clip-text">
          What <span className="font-extrabold">FinZen Offers to you?</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="feature-card w-[90vw] sm:w-[340px] md:w-[380px] mx-auto p-6 rounded-2xl bg-white/90 dark:bg-gray-900/80 shadow-lg border border-transparent flex flex-col items-center text-center min-h-[260px] transition-transform duration-200 ease-in-out cursor-pointer"
            >
              <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#1db954] to-[#1e90ff] text-white shadow-lg">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-lg md:text-xl mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .feature-card {
          transition: transform 0.18s cubic-bezier(0.4,0,0.2,1), box-shadow 0.18s cubic-bezier(0.4,0,0.2,1);
        }
        .feature-card:hover {
          transform: scale(1.05);
          box-shadow: 0 0 0 4px rgba(29,185,84,0.25), 0 0 16px 4px rgba(30,144,255,0.18), 0 8px 32px 0 rgba(30,144,255,0.10);
          border-color: transparent;
        }
      `}</style>
    </section>
  );
};

export default FeatureSection;
