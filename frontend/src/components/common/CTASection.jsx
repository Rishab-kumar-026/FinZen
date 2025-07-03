const CTASection = () => (
  <section className="py-24 bg-gradient-to-br from-secondary-500 to-accent-500 text-white text-center animate-fade-in">
    <div className="max-w-3xl mx-auto px-4">
      <h2 className="text-4xl sm:text-5xl font-bold mb-6">Take Control of Your Finances Today</h2>
      <p className="mb-8 text-lg sm:text-xl font-medium">
        Start your journey with FinZen — track, analyze, and grow your wealth.
      </p>
      <a href="/register">
        <button className="btn-secondary hover:scale-105 transform transition duration-300 shadow-lg">
          Join FinZen
        </button>
      </a>
    </div>
  </section>
);

export default CTASection;
