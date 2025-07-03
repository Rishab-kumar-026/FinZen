import Navbar from "../components/common/Navbar";
import HeroSection from "../components/common/HeroSection";
import FeatureSection from "../components/common/FeatureSection";
import TestimonialSection from "../components/common/TestimonialSection";
import FAQSection from "../components/common/FAQSection";
import Footer from "../components/common/Footer";
import AnimatedBackground from "../components/ui/AnimatedBackground";
import BubbleBackground from "./BubbleBackground";
import React from "react";

const Landing = () => {
  // Hide hero/main content if mobile menu is open
  const [hideContent, setHideContent] = React.useState(false);
  React.useEffect(() => {
    const check = () => {
      setHideContent(window.innerWidth < 1024 && document.body.classList.contains('overflow-hidden'));
    };
    check();
    window.addEventListener('resize', check);
    const observer = new MutationObserver(check);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => {
      window.removeEventListener('resize', check);
      observer.disconnect();
    };
  }, []);

  if (hideContent) return <Navbar />;
  return (
    <div className="relative min-h-screen bg-[#0a0f1c] text-white overflow-hidden ">
      {/* 🌟 Bubbles across entire page */}
      <Navbar />
      <BubbleBackground />

      {/* Page Sections */}
      <HeroSection />
      <FeatureSection />
  
      <TestimonialSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Landing;
