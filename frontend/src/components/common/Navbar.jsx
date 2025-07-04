import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Home,
  Sparkles,
  Compass,
  BarChart3,
  MessageCircle,
  User,
  LogIn,
  UserPlus,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Calculator,
  GraduationCap,
  PiggyBank,
  TrendingUp
} from "lucide-react";

// NavLinkItem: Larger text, gradient-on-hover, no button effect
const NavLinkItem = ({ to, children, isActive, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`px-3 py-2 rounded transition-all duration-300 font-medium text-base whitespace-nowrap
      ${isActive ? 'text-[#1db954] font-semibold' : 'text-gray-700 dark:text-white/90 hover:text-transparent hover:bg-gradient-to-r hover:from-[#1db954] hover:to-[#1e90ff] hover:bg-clip-text'}
    `}
  >
    {children}
  </Link>
);

// Main Navbar
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("User");
  const [exploreOpen, setExploreOpen] = useState(false);
  let exploreTimeout = null;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setIsAuthenticated(!!token);
    setUsername(user.username || "User");
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUsername("User");
    navigate("/login");
  };

  // Dropdown open/close with delay for smoothness
  const handleExploreEnter = () => {
    clearTimeout(exploreTimeout);
    setExploreOpen(true);
  };
  const handleExploreLeave = () => {
    exploreTimeout = setTimeout(() => setExploreOpen(false), 80);
  };

  // Navlinks for center
  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Explore", to: "/explore/spending-coach", dropdown: true },
    { label: "Dashboard", to: "/dashboard" },
    { label: "Set Goals", to: "/set-goals" },
  ];

  // Dropdown for Explore
  const exploreDropdown = [
    { label: "Spending Coach", to: "/explore/spending-coach" },
    { label: "Loan Estimator", to: "/explore/loan-estimator" },
    { label: "Income Tax Calculator", to: "/explore/income-tax-calculator" },
    { label: "Learning", to: "/explore/learning" },
    { label: "Limit Budget", to: "/limit-budget" },
    { label: "Notifications", to: "/notifications" },
  ];

  // Responsive: Hamburger menu for mobile
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg">
      <div className="relative max-w-screen-xl mx-auto px-6 py-3 flex items-center justify-between min-h-[64px]">
        {/* Left: Logo */}
        <div className="flex items-center min-w-[120px]">
          <Link to="/" className="text-xl font-bold tracking-wide bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-transparent bg-clip-text">
            FinZen
          </Link>
        </div>

        {/* Center: Navlinks (absolute centering) */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-x-1">
          {navLinks.map((link, idx) =>
            link.dropdown ? (
              <div
                key={link.label}
                className="relative group flex items-center"
                onMouseEnter={handleExploreEnter}
                onMouseLeave={handleExploreLeave}
              >
                <NavLinkItem to={link.to} isActive={location.pathname.startsWith('/explore')}>
                  <span className="flex items-center">{link.label} <ChevronDown className="inline w-4 h-4 align-middle ml-1" /></span>
                </NavLinkItem>
                {/* Dropdown menu: positioned just below navlink, with animation */}
                <div
                  className={`absolute left-1/2 top-full -translate-x-1/2 mt-2 min-w-[200px] bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-xl border border-white/20 z-50 transition-all duration-200
                    ${exploreOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
                  onMouseEnter={handleExploreEnter}
                  onMouseLeave={handleExploreLeave}
                >
                  <div className="py-2">
                    {exploreDropdown.map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        className="block px-5 py-2 text-base text-gray-700 dark:text-white/90 hover:text-transparent hover:bg-gradient-to-r hover:from-[#1db954] hover:to-[#1e90ff] hover:bg-clip-text transition-all duration-300 whitespace-nowrap"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <NavLinkItem
                key={link.label}
                to={link.to}
                isActive={location.pathname === link.to}
              >
                {link.label}
              </NavLinkItem>
            )
          )}
        </div>

        {/* Right: Auth */}
        <div className="flex items-center min-w-[120px] justify-end gap-2">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="text-gray-700 dark:text-gray-300 font-medium text-base">{username}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-4 py-2 text-base bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-white font-medium rounded-lg hover:from-[#1db954]/80 hover:to-[#1e90ff]/80 transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden lg:block lg:flex items-center gap-4">
              <Link
                to="/login"
                className="flex items-center gap-1 px-4 py-2 text-base bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
              <Link
                to="/signup"
                className="flex items-center gap-1 px-4 py-2 text-base bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-white font-medium rounded-lg hover:from-[#1db954]/80 hover:to-[#1e90ff]/80 transition-all duration-200"
              >
                <UserPlus className="w-4 h-4" />
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Hamburger for mobile */}
        <button
          className="lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X className="w-7 h-7 text-white" /> : <Menu className="w-7 h-7 text-white" />}
        </button>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="absolute flex flex-col top-full left-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200/50 dark:border-gray-700/50 px-6 py-4 space-y-2 rounded-b-lg shadow-lg z-50">
            {navLinks.map((link, idx) =>
              link.dropdown ? (
                <div key={link.label} className="relative group">
                  <NavLinkItem to={link.to} isActive={location.pathname.startsWith('/explore')}>
                    <span className="flex ml-3 items-center justify-between">{link.label} <ChevronDown className="inline w-4 h-4 align-middle ml-1 text-md" /></span>
                  </NavLinkItem>
                  <div className="pl-6 mt-1">
                    {exploreDropdown.map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        className="block px-3 py-2 text-base text-gray-700 dark:text-white/90 hover:text-transparent hover:bg-gradient-to-r hover:from-[#1db954] hover:to-[#1e90ff] hover:bg-clip-text transition-all duration-300 whitespace-nowrap"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLinkItem
                  key={link.label}
                  to={link.to}
                  isActive={location.pathname === link.to}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLinkItem>
              )
            )}
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700 mt-2">
              {isAuthenticated ? (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-gray-700 dark:text-gray-300 font-medium text-base">{username}</span>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="flex items-center gap-1 px-4 py-2 text-base bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-white font-medium rounded-lg hover:from-[#1db954]/80 hover:to-[#1e90ff]/80 transition-all duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex  items-center gap-2 mt-2">
                  <Link
                    to="/login"
                    className="flex items-center gap-1 px-4 py-2 text-base bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <LogIn className="w-4 h-4" />
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center gap-1 px-4 py-2 text-base bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-white font-medium rounded-lg hover:from-[#1db954]/80 hover:to-[#1e90ff]/80 transition-all duration-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    <UserPlus className="w-4 h-4" />
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
