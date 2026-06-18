const ExperienceTab = ({ data, onChange }) => {
  const experiences = data?.experience || [];

  const addExp = () => {
    onChange({
      ...data,
      experience: [
        ...experiences,
        { company: '', position: '', duration: '', description: '' }
      ]
    });
  };

  const updateExp = (index, field, value) => {
    const updated = experiences.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    onChange({ ...data, experience: updated });
  };

  const removeExp = (index) => {
    onChange({
      ...data,
      experience: experiences.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="flex flex-col gap-4 text-[#f0f0f8]">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-200">Experience</h3>

        <button
          onClick={addExp}
          className="px-3 py-1 text-sm text-white transition bg-[#7c5cfc] rounded-lg hover:bg-[#6a4ae8] cursor-pointer"
        >
          + Add
        </button>
      </div>

      {/* Cards */}
      {experiences.map((exp, i) => (
        <div
          key={i}
          className="border border-gray-700 bg-[#111118] rounded-lg p-4 flex flex-col gap-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-400">
              Experience {i + 1}
            </span>

            <button
              onClick={() => removeExp(i)}
              className="text-xs text-red-400 cursor-pointer hover:underline"
            >
              Remove
            </button>
          </div>

          {['position', 'company', 'duration'].map((field) => (
            <input
              key={field}
              type="text"
              value={exp[field] || ''}
              onChange={(e) => updateExp(i, field, e.target.value)}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="w-full px-3 py-2 text-sm bg-[#0a0a0f] border border-gray-700 text-white rounded-lg focus:outline-none focus:border-[#7c5cfc]"
            />
          ))}

          <textarea
            value={exp.description || ''}
            onChange={(e) => updateExp(i, 'description', e.target.value)}
            placeholder="Description..."
            rows={2}
            className="w-full px-3 py-2 text-sm bg-[#0a0a0f] border border-gray-700 text-white rounded-lg resize-none focus:outline-none focus:border-[#7c5cfc]"
          />
        </div>
      ))}

      {/* Empty state */}
      {experiences.length === 0 && (
        <p className="py-4 text-sm text-center text-gray-500">
          Click + Add to add experience
        </p>
      )}
    </div>
  );
};

export default ExperienceTab;