import React, { useRef } from 'react';
import FinanceImg from '../assets/Finance img.svg';
import BubbleBackground from './BubbleBackground';
import { motion } from 'framer-motion';

const COURSE_IMAGE_URL = "https://media.istockphoto.com/id/2168307282/photo/investment-and-financial-concept-business-finance-data-analytics-graph-financial-management.jpg?s=2048x2048&w=is&k=20&c=jvEjtwJJYxDVBhBYmCkRiLMRg8zI1I98-LXtEIEq4YA=";

const courses = [
  {
    title: 'Personal Finance 101',
    description: 'Master the basics of budgeting, saving, and spending wisely for a secure financial future. Learn practical skills to manage your money and build wealth for the long term. Get started with actionable steps and real-world examples to boost your confidence...more',
    image: COURSE_IMAGE_URL,
    platform: 'Coursera',
    rating: 4.8,
    timeline: '6 weeks | Self-paced',
    price: 'Free',
  },
  {
    title: 'Investing for Beginners',
    description: 'Learn how to start investing in stocks, bonds, and more with confidence and clarity. Build your investment portfolio step by step and understand the risks and rewards of different asset classes...more',
    image: 'https://i.pinimg.com/736x/51/0f/97/510f97be2a013d3b1bf7792fefe88005.jpg',
    platform: 'Udemy',
    rating: 4.7,
    timeline: '4 weeks | Self-paced',
    price: '50% OFF',
  },
  {
    title: 'Mutual Funds Made Easy',
    description: 'Understand mutual funds, SIPs, and portfolio diversification for long-term growth. Make informed investment decisions and learn how to select the right funds for your goals...more',
    image:'https://i.pinimg.com/736x/ca/95/8c/ca958ce6a90cf08ac758e7caf70ffda7.jpg',
    platform: 'edX',
    rating: 4.6,
    timeline: '5 weeks | Self-paced',
    price: 'Free',
  },
  {
    title: 'Budgeting for Success',
    description: 'Create and manage budgets to achieve your financial goals and reduce stress. Learn proven techniques to track expenses, set savings targets, and stick to your plan...more',
    image:'https://i.pinimg.com/736x/e3/40/71/e34071c64be9ad7f68d979d32d918cde.jpg',
    platform: 'Skillshare',
    rating: 4.5,
    timeline: '3 weeks | Self-paced',
    price: 'Free',
  },
  {
    title: 'Tax Planning Basics',
    description: 'Learn tax-saving strategies and optimize your returns with smart planning. Discover deductions, credits, and filing tips to keep more of your money each year...more',
    image:'https://i.pinimg.com/736x/a0/db/9a/a0db9aabda63ac4c9da21aba1854ebfb.jpg',
    platform: 'Coursera',
    rating: 4.4,
    timeline: '2 weeks | Self-paced',
    price: '30% OFF',
  },
  {
    title: 'Credit & Loans Demystified',
    description: 'Understand credit scores, loans, and responsible borrowing for a healthy credit life. Learn how to improve your credit and choose the best loan options...more',
    image: 'https://i.pinimg.com/736x/9e/0f/08/9e0f08614a91170ebd5328de7ce0b1d3.jpg',
    platform: 'Udemy',
    rating: 4.7,
    timeline: '4 weeks | Self-paced',
    price: 'Free',
  },
  {
    title: 'Retirement Planning',
    description: 'Plan for a secure and comfortable retirement with expert-backed strategies. Explore retirement accounts, investment options, and withdrawal plans for peace of mind...more',
    image: 'https://i.pinimg.com/736x/07/ea/ec/07eaec5535af71bae6f55c1fb181a674.jpg',
    platform: 'edX',
    rating: 4.9,
    timeline: '5 weeks | Self-paced',
    price: 'Free',
  },
  {
    title: 'Insurance Essentials',
    description: 'Protect yourself and your family with the right insurance policies and knowledge. Learn about health, life, and property insurance to safeguard your future...more',
    image: 'https://i.pinimg.com/736x/de/1d/e4/de1de48bc3840534ef9ed53b589f0c43.jpg', 
    platform: 'Skillshare',
    rating: 4.5,
    timeline: '2 weeks | Self-paced',
    price: 'Free',
  },
  {
    title: 'Stock Market for Beginners',
    description: 'Start investing in stocks with confidence and foundational knowledge. Learn how the stock market works and how to pick your first stocks...more',
    image: 'https://i.pinimg.com/736x/ed/6a/56/ed6a56583de5e61fd49c2c9c07baa4f2.jpg',
    platform: 'Coursera',
    rating: 4.6,
    timeline: '6 weeks | Self-paced',
    price: 'Free',
  },
 
];

function trimDescription(desc) {
  const words = desc.split(' ');
  if (words.length <= 25) return desc;
  return words.slice(0, 25).join(' ') + '...more';
}

const platformStyles = {
  Coursera: 'bg-blue-100 text-blue-700 border-blue-300',
  Udemy: 'bg-purple-100 text-purple-700 border-purple-300',
  edX: 'bg-indigo-100 text-indigo-700 border-indigo-300',
  Skillshare: 'bg-green-100 text-green-700 border-green-300',
};

const ExploreLearning = () => {
  const coursesRef = useRef(null);

  const handleScrollToCourses = () => {
    if (coursesRef.current) {
      coursesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-[#e0e7ff] to-[#f0f4ff] dark:from-gray-900 dark:to-gray-800 overflow-x-hidden">
      <BubbleBackground />
      {/* HERO SECTION */}
      <section className="w-full h-auto mt-8  flex flex-col justify-center items-center pt-16 md:pt-24 pb-8 md:pb-16 lg:h-screen">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-full max-w-screen-xl mx-auto px-6 gap-10 lg:gap-0">
          {/* Left Side */}
          <div className="flex-1 flex flex-col items-start justify-center text-left space-y-6 lg:pr-12">
            <motion.h1
              className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-transparent bg-clip-text mb-2"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Learn the Art of Investing
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-gray-700 dark:text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Financial education is the foundation of a secure future. Investing wisely and understanding money management empowers you to achieve your dreams.
            </motion.p>
            <motion.p
              className="text-lg md:text-xl text-gray-700 dark:text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8 }}
            >
              Start your journey with FinZen's curated courses and unlock the secrets to financial freedom.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <button
                onClick={handleScrollToCourses}
                className="mt-4 bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-white font-bold py-3 px-8 rounded-lg shadow hover:scale-105 hover:shadow-lg transition-all duration-300 text-lg"
              >
                Start Learning
              </button>
            </motion.div>
          </div>
          {/* Right Side */}
          <div className="flex-1 flex items-center justify-center animate-fade-in-right">
            <img
              src={FinanceImg}
              alt="Finance Illustration"
              className="w-full max-w-md h-auto object-contain drop-shadow-xl"
            />
          </div>
        </div>
      </section>
      {/* COURSES SECTION */}
      <section id="courses" ref={coursesRef} className="w-full max-w-screen-xl mx-auto px-6 py-12 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-transparent bg-clip-text">Our Top Finance & Investment Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course, i) => (
            <div
              key={i}
              className="course-card flex flex-col rounded-xl bg-white/70 dark:bg-gray-900/70 shadow-md border border-transparent overflow-hidden group h-[500px] animate-fade-in-up cursor-pointer transition-transform duration-200 ease-in-out"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {/* Image Top 50% */}
              <div className="h-1/2 w-full relative">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold shadow ${course.price === 'Free' ? 'bg-blue-600 text-white' : 'bg-green-100 text-green-700 border border-green-300'}`}>{course.price}</span>
              </div>
              {/* Data Section Bottom 50% */}
              <div className="relative flex-1 flex flex-col justify-start p-5 bg-white/90 dark:bg-gray-900/80 rounded-b-xl h-1/2">
                <div className="pb-12">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 truncate">{course.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 max-h-16 overflow-hidden text-ellipsis">
                    {trimDescription(course.description)}
                  </p>
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-500 text-base mr-1">★</span>
                    <span className="font-semibold text-gray-700 dark:text-gray-200 text-sm mr-2">{course.rating}</span>
                    <span className={`px-3 py-1 rounded-full border font-bold text-xs mr-2 ${platformStyles[course.platform]}`}>{course.platform}</span>
                  </div>
                  <div className="text-xs text-gray-500 mb-2">{course.timeline}</div>
                </div>
                <button className="absolute left-5 right-5 bottom-5 bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-white font-bold py-2 rounded-lg shadow hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Animations (Tailwind custom classes or add to global CSS if needed) */}
      <style>{`
        .animate-fade-in { animation: fadeIn 0.8s ease both; }
        .animate-fade-in-up { animation: fadeInUp 1s ease both; }
        .animate-slide-up { animation: slideUp 1s ease both; }
        .animate-fade-in-right { animation: fadeInRight 1s ease both; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: none; } }
        @keyframes fadeInRight { from { opacity: 0; transform: translateX(60px); } to { opacity: 1; transform: none; } }
        .course-card {
          transition: transform 0.18s cubic-bezier(0.4,0,0.2,1), box-shadow 0.18s cubic-bezier(0.4,0,0.2,1);
        }
        .course-card:hover, .course-card:focus-within {
          transform: scale(1.05);
          box-shadow: 0 8px 32px 0 rgba(30,144,255,0.10), 0 0 16px 4px rgba(30,144,255,0.08);
          border-color: transparent;
          z-index: 10;
        }
      `}</style>
    </div>
  );
};

export default ExploreLearning; 