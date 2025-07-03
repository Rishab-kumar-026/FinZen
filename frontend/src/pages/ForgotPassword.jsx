import BubbleBackground from "./BubbleBackground"; // Adjust path if needed

const ForgotPassword = () => (
  <div className="relative min-h-screen flex items-center justify-center text-white bg-[#0a0f1c] overflow-hidden">
    {/* 🫧 Animated Bubble Background */}
    <BubbleBackground />

    {/* 🔐 Forgot Password Card */}
    <div className="z-10 bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-xl w-full max-w-md text-center border border-white/20">
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-transparent bg-clip-text">
        Forgot Password
      </h2>
      <p className="mb-4 text-sm text-gray-300">
        We’ll help you recover your account.
      </p>
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full p-3 mb-4 bg-white/20 placeholder-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-300"
      />
      <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-green-500 transition-all duration-300 font-semibold rounded-lg">
        Send Reset Link
      </button>
    </div>
  </div>
);

export default ForgotPassword;
