import GrammarFixer from '../ai/GrammarFixer';

const ExperienceTab = ({ cvData: data, setCvData: onChange }) => {
  const experiences = data?.experience || [];

  const addExp = () => {
    if (typeof onChange === 'function') {
      onChange((prevData) => {
        const currentData = prevData || data || {};
        return {
          ...currentData,
          experience: [
            ...(currentData.experience || []),
            {
              jobTitle: '',
              position: '',
              company: '',
              startDate: '',
              endDate: '',
              duration: '',
              description: ''
            }
          ]
        };
      });
    }
  };

  const updateExp = (index, field, value) => {
    if (typeof onChange === 'function') {
      onChange((prevData) => {
        const currentData = prevData || data || {};
        const updatedExp = (currentData.experience || []).map((exp, i) => {
          if (i === index) {
            const updatedItem = { ...exp, [field]: value };
            
            if (field === 'jobTitle') updatedItem.position = value;
            if (field === 'startDate' || field === 'endDate') {
              const start = field === 'startDate' ? value : (exp.startDate || '');
              const end = field === 'endDate' ? value : (exp.endDate || '');
              updatedItem.duration = `${start} - ${end}`.trim();
            }

            return updatedItem;
          }
          return exp;
        });

        return {
          ...currentData,
          experience: updatedExp
        };
      });
    }
  };

  const handleApplyAiGrammar = (index, improvedText) => {
    if (typeof onChange === 'function') {
      onChange((prevData) => {
        const currentData = prevData || data || {};
        const updatedExp = (currentData.experience || []).map((exp, i) => {
          if (i === index) {
            return { ...exp, description: improvedText };
          }
          return exp;
        });

        return {
          ...currentData,
          aiUsed: true,
          aiUses: (currentData.aiUses || 0) + 1,
          experience: updatedExp
        };
      });
    }
  };

  const removeExp = (index) => {
    if (typeof onChange === 'function') {
      onChange((prevData) => {
        const currentData = prevData || data || {};
        return {
          ...currentData,
          experience: (currentData.experience || []).filter((_, i) => i !== index)
        };
      });
    }
  };

  const inputStyle = "w-full px-4 py-3 text-sm bg-[#141420] border border-[#2a2a42] text-white rounded-xl focus:outline-none focus:border-[#7766ba] focus:ring-1 focus:ring-[#7c5cfc] focus:shadow-[0_0_12px_rgba(124,92,252,0.25)] transition-all duration-150 placeholder-[#9d9db7] font-['DM_Sans',sans-serif]";
  const labelStyle = "text-[13px] font-medium text-[#a2a2bc] font-['DM_Sans',sans-serif]";

  return (
    <div className="space-y-5 w-full text-[#f0f0f8]">
      <div className="flex items-center justify-between pb-2 border-b border-[#2a2a42]">
        <h3 className="text-base font-semibold text-white font-['DM_Sans',sans-serif]">
          Experience
        </h3>
        <button
          type="button"
          onClick={addExp}
          className="px-3.5 py-1.5 text-xs font-medium text-white transition bg-[#7c5cfc] hover:bg-[#6843ec] rounded-lg shadow-md shadow-[#7c5cfc]/20 cursor-pointer"
        >
          + Add
        </button>
      </div>

      {experiences.map((exp, i) => (
        <div
          key={i}
          className="space-y-4 p-5 rounded-2xl border border-[#2a2a42] bg-[#0f0f18] relative shadow-lg"
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

          <div className="flex flex-col gap-1.5">
            <label className={labelStyle}>Job Title</label>
            <input
              type="text"
              value={exp.jobTitle || exp.position || ''}
              onChange={(e) => updateExp(i, 'jobTitle', e.target.value)}
              placeholder="e.g. Frontend Developer Intern"
              className={inputStyle}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelStyle}>Company</label>
            <input
              type="text"
              value={exp.company || ''}
              onChange={(e) => updateExp(i, 'company', e.target.value)}
              placeholder="e.g. Tech Company Ltd"
              className={inputStyle}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className={labelStyle}>Start Date</label>
              <input
                type="text"
                value={exp.startDate || ''}
                onChange={(e) => updateExp(i, 'startDate', e.target.value)}
                placeholder="Jan 2023"
                className={inputStyle}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelStyle}>End Date</label>
              <input
                type="text"
                value={exp.endDate || ''}
                onChange={(e) => updateExp(i, 'endDate', e.target.value)}
                placeholder="Jun 2023 / Present"
                className={inputStyle}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelStyle}>Responsibilities & Achievements</label>
            <textarea
              value={exp.description || ''}
              onChange={(e) => updateExp(i, 'description', e.target.value)}
              placeholder="Describe what you did and the impact you made..."
              rows={4}
              className={`${inputStyle} resize-none leading-relaxed`}
            />

            <GrammarFixer
              text={exp.description}
              onApply={(improved) => handleApplyAiGrammar(i, improved)}
            />
          </div>
        </div>
      ))}

      {experiences.length === 0 && (
        <div className="py-8 text-sm text-center text-[#7070a0] border border-dashed border-[#2a2a42] rounded-2xl bg-[#0f0f18]/50">
          Click "+ Add" to add your work experience history records.
        </div>
      )}
    </div>
  );
};

export default ExperienceTab;