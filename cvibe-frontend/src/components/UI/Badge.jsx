const Badge = ({ children, color = "purple" }) => {
  const colors = {
    purple: "bg-purple-100 text-purple-800",
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    gray: "bg-gray-100 text-gray-700",
  };

  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-full ${colors[color]}`}>
      {children}
    </span>
  );
};

export default Badge;