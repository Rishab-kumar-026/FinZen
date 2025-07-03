import {
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => (
  <footer className="bg-[#0a0f1c] text-white pt-16 pb-4 px-6 border-t border-white/10 backdrop-blur-md">
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-sm">

      {/* Company Info */}
      <div>
        <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#1db954] to-[#1e90ff] mb-3">
          FinZen
        </h3>
        <p className="text-white/70 mb-4">
          AI-powered UPI Expense Analyzer and smart financial dashboard tailored for Indian users.
        </p>
        <div className="space-y-2 text-white/60">
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-[#1db954]" /> Hyderabad, India
          </p>
          <p className="flex items-center gap-2">
            <FaEnvelope className="text-[#1db954]" /> support@finzen.in
          </p>
          <p className="flex items-center gap-2">
            <FaPhone className="text-[#1db954]" /> +91 98765 43210
          </p>
        </div>
      </div>

      {/* Product Links */}
      <div>
        <h4 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#1db954] to-[#1e90ff] mb-3">
          Product
        </h4>
        <ul className="space-y-2 text-white/70">
          <li><a href="/features" className="hover:text-[#F97A00] transition">Features</a></li>
          <li><a href="/pricing" className="hover:text-[#F97A00] transition">Pricing</a></li>
          <li><a href="/dashboard" className="hover:text-[#F97A00] transition">Dashboard</a></li>
          <li><a href="/analyzer" className="hover:text-[#F97A00] transition">AI Analyzer</a></li>
        </ul>
      </div>

      {/* Company Info */}
      <div>
        <h4 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#1db954] to-[#1e90ff] mb-3">
          Company
        </h4>
        <ul className="space-y-2 text-white/70">
          <li><a href="/about" className="hover:text-[#F97A00] transition">About Us</a></li>
          <li><a href="/contact" className="hover:text-[#F97A00] transition">Contact</a></li>
          <li><a href="/careers" className="hover:text-[#F97A00] transition">Careers</a></li>
          <li><a href="/blog" className="hover:text-[#F97A00] transition">Blog</a></li>
        </ul>
      </div>

      {/* Social Links */}
      <div>
        <h4 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#1db954] to-[#1e90ff] mb-3">
          Connect With Us
        </h4>
        <div className="flex items-center gap-4 text-[#1db954] text-xl">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F97A00] transition">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F97A00] transition">
            <FaLinkedin />
          </a>
        </div>
        <p className="mt-4 text-white/60">
          Stay updated with our latest features and insights.
        </p>
      </div>
    </div>

    {/* Footer Bottom */}
    <div className="border-t border-white/10 mt-6 pt-4 text-center text-xs text-white/60">
      © {new Date().getFullYear()} FinZen. Built with ❤️ in India. All rights reserved.
    </div>
  </footer>
);

export default Footer;
