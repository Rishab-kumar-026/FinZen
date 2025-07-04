const Input = ({ label, type = "text", className = "", ...props }) => (
  <div className="mb-4">
    {label && <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
    <input
      type={type}
      {...props}
      className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1db954] focus:border-transparent transition-all duration-200 ${className}`}
    />
  </div>
);

export { Input };
