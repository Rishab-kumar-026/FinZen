const Input = ({ label, type = "text", ...props }) => (
  <div className="mb-4">
    {label && <label className="block mb-1 text-sm font-medium">{label}</label>}
    <input
      type={type}
      {...props}
      className="input"
    />
  </div>
);

export default Input;
