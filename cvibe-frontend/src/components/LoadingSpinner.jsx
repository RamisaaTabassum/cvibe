const LoadingSpinner = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>

      <p className="text-sm text-gray-500">
        {text}
      </p>
    </div>
  );
};

export default LoadingSpinner;