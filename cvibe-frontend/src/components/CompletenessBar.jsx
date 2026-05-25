const CompletenessBar = ({ data }) => {
  const checks = [
    !!data?.personalInfo?.name,
    !!data?.personalInfo?.email,
    !!data?.personalInfo?.title,
    !!data?.personalInfo?.phone,
    !!data?.personalInfo?.summary,
    data?.experience?.length > 0,
    data?.education?.length > 0,
    data?.skills?.length > 0,
  ];

  const filled = checks.filter(Boolean).length;
  const percent = Math.round((filled / checks.length) * 100);

  const color =
    percent < 40 ? 'bg-red-500' :
    percent < 70 ? 'bg-yellow-500' :
    'bg-green-500';

  return (
    <div className="px-4 py-3 bg-white border-b border-gray-200">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-600">CV Completeness</span>
        <span className="text-sm font-bold text-gray-800">{percent}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      {percent < 100 && (
        <p className="text-xs text-gray-400 mt-1">
          {filled}/{checks.length} sections completed
        </p>
      )}
    </div>
  );
};

export default CompletenessBar;