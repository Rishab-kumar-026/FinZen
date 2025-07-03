import { FaQuoteLeft, FaQuoteRight, FaStar } from "react-icons/fa";

const testimonials = [
  {
    image: "https://media.istockphoto.com/id/2148494746/photo/portrait-of-young-businesswoman-with-curly-hairstyle-wear-trendy-smart-casual-outfit-isolated.jpg?b=1&s=612x612&w=0&k=20&c=mT4FdkIpTiTgtghZyOidCEFzGzEt9zHa3RaEOkPQrBc=",
    name: "Riya Patel",
    profession: "Startup Founder",
    review: "FinZen helped me regain control over my spending — love the AI nudges! The dashboard is so intuitive and the insights are spot on. Highly recommended for anyone serious about their money.",
    rating: 5,
    icon: "💰",
  },
  {
    image: "https://images.pexels.com/photos/845457/pexels-photo-845457.jpeg",
    name: "Aman Verma",
    profession: "Software Developer",
    review: "I can finally visualize where my money goes. Incredible UI! The UPI integration and tax calculator are game-changers. FinZen makes finance fun and easy.",
    rating: 5,
    icon: "📊",
  },
  {
    image: "https://images.pexels.com/photos/415263/pexels-photo-415263.jpeg",
    name: "Sanya Reddy",
    profession: "College Student",
    review: "I never knew budgeting could be this intuitive. The insights are a game-changer! I love the nudges and the learning resources.",
    rating: 4,
    icon: "🧠",
  },
  {
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Rahul Singh",
    profession: "Marketing Manager",
    review: "The best part is the smart spending coach. It actually helped me save more every month. The app is beautiful and super easy to use.",
    rating: 5,
    icon: "🔐",
  },
  {
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Priya Sharma",
    profession: "Freelancer",
    review: "FinZen's AI chatbot is so helpful! I get answers to all my finance questions instantly. The features are top-notch.",
    rating: 5,
    icon: "🤖",
  },
];

const TestimonialSection = () => {
  return (
    <section className="relative py-20 md:py-28 bg-[#0a0f1c] text-white font-sans overflow-hidden">
      <div className="max-w-3xl mx-auto text-center mb-12 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-transparent bg-clip-text">
          Loved by the FinZen Community
        </h2>

      </div>
      {/* Scrollable Testimonials */}
      <div className="overflow-x-auto scrollbar-hide ">
        <div className="max-w-7xl mx-auto flex justify-center">
          <div className="flex gap-8 md:gap-10 lg:gap-12 w-full mx-auto snap-x snap-mandatory overflow-x-auto" style={{ maxWidth: '100%', overflowX: 'auto', scrollSnapType: 'x mandatory' }}>
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="testimonial-card w-[90vw] sm:w-[340px] md:w-[380px] flex-shrink-0 snap-start bg-gradient-to-br from-white/10 to-[#1e293b]/30 dark:from-gray-900/60 dark:to-gray-800/80 border border-white/10 backdrop-blur-md p-8 pb-24 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-200 group h-full cursor-pointer relative"
                style={{ display: 'block' }}
              >
                {/* Quoted testimonial */}
                <div className="mt-8 mb-4 min-h-[80px] flex flex-col justify-center">
                  <FaQuoteLeft className="text-[#1db954] text-xl mb-2 opacity-80" />
                  <p className="italic text-lg text-white/90 leading-relaxed">{t.review} </p>
                  <FaQuoteRight className="text-[#1db954] text-xl mt-2 opacity-80" />
                  
                </div>
                {/* Ratings, User info absolute bottom */}
                <div className="absolute left-0 right-0 bottom-0 flex flex-col items-center pb-6">
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, idx) => (
                      <FaStar key={idx} className={idx < t.rating ? 'text-yellow-400 text-lg' : 'text-gray-500 text-lg'} />
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#1db954] shadow" />
                    <div className="text-left">
                      <div className="font-semibold text-base text-white leading-tight">{t.name}</div>
                      <div className="text-sm text-blue-200 leading-tight">{t.profession}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .testimonial-card {
          /* No hover effect */
        }
        @media (min-width: 1024px) {
          .testimonial-scroll {
            max-width: 1200px;
            width: 1140px;
            overflow-x: auto;
          }
        }
      `}</style>
    </section>
  );
};

export default TestimonialSection;
