const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const base = "font-medium px-4 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const styles = {
    primary: "bg-gradient-to-r from-[#1db954] to-[#1e90ff] hover:from-[#1db954]/80 hover:to-[#1e90ff]/80 text-white focus:ring-[#1db954]",
    secondary: "bg-transparent border-2 border-[#1db954] text-[#1db954] hover:bg-[#1db954] hover:text-white focus:ring-[#1db954]",
    ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-gray-400"
  };
  return <button className={`${base} ${styles[variant]} ${className}`} {...props}>{children}</button>;
};

export { Button };
