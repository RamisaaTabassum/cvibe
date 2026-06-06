
const ExperienceTab = ({ data, onChange }) => {
  const experiences = data?.experience || [];

  // Structural template initialization matching your state's schema
  const addExp = () => {
    onChange({
      ...data,
      experience: [
        ...experiences,
        { jobTitle: '', company: '', startDate: '', endDate: '', description: '' }
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
    <div className="space-y-6 w-full text-[#f0f0f8]">
      
      {/* Dynamic List Controls Header Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#2a2a38]">
        <h3 className="text-base font-semibold text-gray-200 font-['DM_Sans',sans-serif]">
          Experience
        </h3>
        <button
          type="button"
          onClick={addExp}
          className="px-3 py-1.5 text-xs font-medium text-white transition bg-[#7c5cfc] rounded-lg hover:bg-[#6a4ae8] cursor-pointer"
        >
          + Add
        </button>
      </div>

      {/* Experience Block Lists Card Row */}
      {experiences.map((exp, i) => (
        <div
          key={i}
          className="space-y-4 p-4 rounded-xl border border-[#2a2a38] bg-[#0d0d14]/40 relative"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold tracking-wider text-[#7c5cfc] uppercase">
              Entry #{i + 1}
            </span>
            <button
              type="button"
              onClick={() => removeExp(i)}
              className="text-xs text-red-400 transition cursor-pointer hover:underline hover:text-red-300"
            >
              Remove
            </button>
          </div>

          {/* 1. Job Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-gray-400 font-['DM_Sans',sans-serif]">
              Job Title
            </label>
            <input
              type="text"
              value={exp.jobTitle || ''}
              onChange={(e) => updateExp(i, 'jobTitle', e.target.value)}
              placeholder="e.g. Frontend Developer Intern"
              className="w-full px-4 py-3 text-sm bg-[#12121a] border border-[#2a2a38] text-white rounded-lg focus:outline-none focus:border-[#7c5cfc] transition duration-150"
            />
          </div>

          {/* 2. Company */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-gray-400 font-['DM_Sans',sans-serif]">
              Company
            </label>
            <input
              type="text"
              value={exp.company || ''}
              onChange={(e) => updateExp(i, 'company', e.target.value)}
              placeholder="e.g. Tech Company Ltd"
              className="w-full px-4 py-3 text-sm bg-[#12121a] border border-[#2a2a38] text-white rounded-lg focus:outline-none focus:border-[#7c5cfc] transition duration-150"
            />
          </div>

          {/* 3. Side-by-Side Dual Grid: Start Date & End Date */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-gray-400 font-['DM_Sans',sans-serif]">
                Start Date
              </label>
              <input
                type="text"
                value={exp.startDate || ''}
                onChange={(e) => updateExp(i, 'startDate', e.target.value)}
                placeholder="Jan 2023"
                className="w-full px-4 py-3 text-sm bg-[#12121a] border border-[#2a2a38] text-white rounded-lg focus:outline-none focus:border-[#7c5cfc] transition duration-150"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-gray-400 font-['DM_Sans',sans-serif]">
                End Date
              </label>
              <input
                type="text"
                value={exp.endDate || ''}
                onChange={(e) => updateExp(i, 'endDate', e.target.value)}
                placeholder="Jun 2023"
                className="w-full px-4 py-3 text-sm bg-[#12121a] border border-[#2a2a38] text-white rounded-lg focus:outline-none focus:border-[#7c5cfc] transition duration-150"
              />
            </div>
          </div>

          {/* 4. Responsibilities & Achievements Description View */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-gray-400 font-['DM_Sans',sans-serif]">
              Responsibilities & Achievements
            </label>
            <textarea
              value={exp.description || ''}
              onChange={(e) => updateExp(i, 'description', e.target.value)}
              placeholder="Describe what you did and the impact you made..."
              rows={4}
              className="w-full px-4 py-3 text-sm bg-[#12121a] border border-[#2a2a38] text-white rounded-lg resize-none focus:outline-none focus:border-[#7c5cfc] transition duration-150 leading-relaxed"
            />
          </div>

        </div>
      ))}

      {/* Fallback Empty Display Presentation State Context Block */}
      {experiences.length === 0 && (
        <div className="py-8 text-sm text-center text-gray-500 border border-dashed border-[#2a2a38] rounded-xl bg-[#0d0d14]/20">
          Click "+ Add" to add your work experience history records.
        </div>
      )}

    </div>
  );
};

export default ExperienceTab;