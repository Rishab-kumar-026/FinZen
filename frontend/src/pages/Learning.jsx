import React from 'react';

const courses = [
  {
    title: 'Personal Finance Essentials',
    description: 'Master budgeting, saving, and smart spending for everyday life.',
    image: 'https://source.unsplash.com/400x220/?finance,money',
    cost: 'FREE',
    rating: 4.8,
    learners: '12K+',
    platform: 'Coursera',
    platformLogo: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Coursera_logo.svg',
  },
  {
    title: 'Investing Basics',
    description: 'Learn the fundamentals of stocks, bonds, and building wealth.',
    image: 'https://source.unsplash.com/400x220/?investing,stock',
    cost: '50% OFF',
    rating: 4.7,
    learners: '8K+',
    platform: 'Udemy',
    platformLogo: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Udemy_logo.svg',
  },
  {
    title: 'Mutual Funds Simplified',
    description: 'Understand mutual funds, SIPs, and portfolio diversification.',
    image: 'https://source.unsplash.com/400x220/?mutualfunds,finance',
    cost: 'FREE',
    rating: 4.6,
    learners: '6K+',
    platform: 'edX',
    platformLogo: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/EdX.svg',
  },
  {
    title: 'Budgeting for Beginners',
    description: 'Create and manage budgets to achieve your financial goals.',
    image: 'https://source.unsplash.com/400x220/?budget,planning',
    cost: 'FREE',
    rating: 4.5,
    learners: '10K+',
    platform: 'Skillshare',
    platformLogo: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Skillshare_logo.svg',
  },
  {
    title: 'Tax Planning 101',
    description: 'Learn tax-saving strategies and optimize your returns.',
    image: 'https://source.unsplash.com/400x220/?tax,finance',
    cost: '30% OFF',
    rating: 4.4,
    learners: '5K+',
    platform: 'Coursera',
    platformLogo: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Coursera_logo.svg',
  },
  {
    title: 'Credit & Loans Demystified',
    description: 'Understand credit scores, loans, and responsible borrowing.',
    image: 'https://source.unsplash.com/400x220/?credit,loan',
    cost: 'FREE',
    rating: 4.7,
    learners: '7K+',
    platform: 'Udemy',
    platformLogo: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Udemy_logo.svg',
  },
  {
    title: 'Retirement Planning',
    description: 'Plan for a secure and comfortable retirement.',
    image: 'https://source.unsplash.com/400x220/?retirement,finance',
    cost: 'FREE',
    rating: 4.9,
    learners: '4K+',
    platform: 'edX',
    platformLogo: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/EdX.svg',
  },
  {
    title: 'Insurance Essentials',
    description: 'Protect yourself and your family with the right insurance.',
    image: 'https://source.unsplash.com/400x220/?insurance,policy',
    cost: 'FREE',
    rating: 4.5,
    learners: '3K+',
    platform: 'Skillshare',
    platformLogo: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Skillshare_logo.svg',
  },
  {
    title: 'Stock Market for Beginners',
    description: 'Start investing in stocks with confidence and knowledge.',
    image: 'https://source.unsplash.com/400x220/?stock,market',
    cost: 'FREE',
    rating: 4.6,
    learners: '9K+',
    platform: 'Coursera',
    platformLogo: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Coursera_logo.svg',
  },
  {
    title: 'Financial Freedom Blueprint',
    description: 'Steps to achieve financial independence and peace of mind.',
    image: 'https://source.unsplash.com/400x220/?freedom,finance',
    cost: 'FREE',
    rating: 4.8,
    learners: '11K+',
    platform: 'Udemy',
    platformLogo: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Udemy_logo.svg',
  },
];

const Learning = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#e0e7ff] to-[#f0f4ff] dark:from-gray-900 dark:to-gray-800 py-16">
    <div className="max-w-screen-xl mx-auto px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-transparent bg-clip-text">📚 Finance Learning Hub</h1>
      <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">Explore top-rated courses to master personal finance, investing, tax planning, and more. Learn from the best platforms and take control of your financial future!</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full min-w-0">
        {courses.map((course, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-100 hover:border-[#1db954] transition-all duration-200 flex flex-col overflow-hidden group w-full min-w-0 break-words">
            <div className="relative">
              <img src={course.image} alt={course.title} className="w-full h-40 object-cover h-auto" />
              <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">{course.cost}</span>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center mb-2">
                <span className="text-yellow-500 text-base mr-1">★</span>
                <span className="font-semibold text-gray-700 text-sm mr-2">{course.rating}</span>
                <span className="text-gray-400 text-xs">· {course.learners} learners</span>
              </div>
              <h2 className="font-bold text-lg text-gray-900 mb-1">{course.title}</h2>
              <p className="text-gray-600 text-sm mb-4 flex-1">{course.description}</p>
              <div className="flex items-center mb-4">
                <img src={course.platformLogo} alt={course.platform} className="h-6 w-auto mr-2" />
                <span className="text-xs font-semibold text-gray-500">{course.platform}</span>
              </div>
              <button className="mt-auto bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-white font-bold py-2 rounded-lg shadow hover:scale-105 transition-transform">Enroll Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Learning; 