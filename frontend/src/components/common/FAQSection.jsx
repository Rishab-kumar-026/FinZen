import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqList = [
  {
    q: "Is FinZen free to use?",
    a: (
      <>
        <p>Yes, FinZen offers a free plan that gives you access to all the essential features you need to manage your finances, track expenses, and set goals. You can get started and use the core platform without paying anything.</p>
        <p>For users who want advanced analytics, premium AI features, or priority support, we also offer affordable premium plans. You can always upgrade or downgrade your plan as your needs change.</p>
      </>
    ),
  },
  {
    q: "Is my financial data safe?",
    a: (
      <>
        <p>Absolutely. We take your privacy and security very seriously. All your financial data is protected with bank-level AES-256 encryption, both in transit and at rest, ensuring that your information is always secure.</p>
        <p>FinZen will never share your data with third parties without your explicit consent. Our systems are regularly audited, and we follow best practices in data security to keep your information safe.</p>
      </>
    ),
  },
  {
    q: "Can I sync multiple UPI apps?",
    a: (
      <>
        <p>Yes, you can connect and sync multiple UPI apps such as GPay, PhonePe, Paytm, and more, all under a single FinZen dashboard. This allows you to get a unified view of your transactions and spending across all platforms.</p>
        <p>Our integration is seamless and secure, so you can easily track, categorize, and analyze your UPI transactions without switching between different apps.</p>
      </>
    ),
  },
  {
    q: "What is AI Analyzer?",
    a: (
      <>
        <p>The AI Analyzer is FinZen's intelligent assistant that automatically tracks your spending patterns, classifies your transactions, and provides personalized nudges to help you stay on top of your finances.</p>
        <p>It uses advanced machine learning to spot trends, alert you to unusual activity, and suggest ways to optimize your budget. The more you use FinZen, the smarter the AI Analyzer becomes.</p>
      </>
    ),
  },
  {
    q: "Will I get spending alerts?",
    a: (
      <>
        <p>Yes, you'll receive instant alerts and smart nudges whenever your spending approaches or exceeds the limits you've set for yourself. These notifications help you stay mindful and avoid overspending.</p>
        <p>You can customize your alert preferences, so you only get notified about what matters most to you—whether it's low savings, high expenses, or new opportunities to save.</p>
      </>
    ),
  },
  {
    q: "Is there a mobile app?",
    a: (
      <>
        <p>We're working hard on the FinZen mobile app! Soon, you'll be able to manage your finances, track expenses, and access all features on the go, with full sync and offline access.</p>
        <p>Stay tuned for updates—we'll notify all users as soon as the app is available for download on iOS and Android. In the meantime, you can use FinZen's web platform from any device.</p>
      </>
    ),
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-20 bg-[#0a0f1c] text-white overflow-hidden">
      {/* Bubble Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="faqBubble" cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor="#1db954" />
              <stop offset="100%" stopColor="#1e3c72" />
            </radialGradient>
          </defs>
          <g fill="url(#faqBubble)" fillOpacity="0.15">
            {Array.from({ length: 25 }).map((_, i) => (
              <circle
                key={i}
                r={Math.random() * 100 + 20}
                cx={Math.random() * 1600}
                cy={Math.random() * 1000}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Section Heading */}
      <motion.h2
        className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-transparent bg-clip-text"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Frequently Asked Questions
      </motion.h2>

      {/* FAQ Cards */}
      <div className="max-w-4xl mx-auto space-y-4 px-6">
        {faqList.map((item, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl transition hover:bg-white/10"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center text-left"
            >
              <h3 className="text-lg font-semibold text-[#e6ccff]">
                <motion.h2
                  className=" bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-transparent bg-clip-text"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.q}
                </motion.h2>
              </h3>
              <span className="text-[#d1a6ff]">
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  className="text-gray-300 mt-4 space-y-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.a}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
