const Button = ({ children, variant = "primary", ...props }) => {
  const base = "font-medium px-6 py-3 rounded-lg transition duration-200";
  const styles = {
    primary: "bg-primary-500 hover:bg-primary-600 text-white",
    secondary: "bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white",
    ghost: "bg-transparent hover:bg-primary-50 dark:hover:bg-slate-800 text-primary-500"
  };
  return <button className={`${base} ${styles[variant]}`} {...props}>{children}</button>;
};

export default Button;
