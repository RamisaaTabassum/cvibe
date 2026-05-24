const Input = ({ label, type = "text", placeholder, value, onChange, error }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border rounded-lg px-3 py-2 text-sm outline-none transition
          ${error 
            ? "border-red-400 focus:ring-2 focus:ring-red-200" 
            : "border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          }`}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Input;