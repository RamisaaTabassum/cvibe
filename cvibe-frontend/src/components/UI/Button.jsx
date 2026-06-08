const Button = ({ children, variant = "primary", onClick, type = "button", disabled }) => {
  const styles = {
    primary: "bg-purple-600 text-white hover:bg-purple-700",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    outline: "border border-purple-600 text-purple-600 hover:bg-purple-50",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-medium transition text-sm
        ${styles[variant]} 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
      {children}
    </button>
  );
};

export default Button;