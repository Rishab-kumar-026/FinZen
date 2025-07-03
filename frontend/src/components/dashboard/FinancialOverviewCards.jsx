// src/components/Dashboard/FinancialOverviewCards.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchCardsOverview } from "../../utils/api";

const FinancialOverviewCards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchData = async () => {
      const data = await fetchCardsOverview(token);
      setCards(data);
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full min-w-0 overflow-x-auto">
      {cards.map((card, index) => {
        let cardClass = "rounded-xl p-4 sm:p-6 shadow-lg transition-all hover:scale-105 hover:shadow-2xl hover:border-2 hover:border-[#1db954]/60 w-full min-w-0 ";
        if (card.label === "Total Spend") {
          cardClass += "bg-gradient-to-r from-red-600 to-pink-600 ";
        } else if (card.label === "Savings") {
          cardClass += "bg-gradient-to-r from-green-600 to-lime-500 ";
        } else {
          cardClass += `bg-gradient-to-r ${card.gradient} `;
        }
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className={cardClass}
          >
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-full text-white text-3xl">
                {card.icon}
              </div>
              <div>
                <p className="text-sm uppercase text-white/80">{card.label}</p>
                <p className="text-lg font-semibold">{card.title}</p>
                <p className="text-2xl font-bold">{card.value}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FinancialOverviewCards;
