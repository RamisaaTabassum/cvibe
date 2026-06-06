
const SkillsTab = ({ data, onChange }) => {
  // Direct state handler matching the layout fields
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="space-y-4 w-full text-[#f0f0f8]">
      
      {/* 1. Technical Skills */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-gray-400 font-['DM_Sans',sans-serif]">
          Technical Skills
        </label>
        <input
          type="text"
          value={data?.technicalSkills || data?.skills || ''}
          onChange={(e) => handleChange('technicalSkills', e.target.value)}
          placeholder="React, Node.js, MongoDB, Python, Git"
          className="w-full px-4 py-3 text-sm bg-[#12121a] border border-[#2a2a38] text-white rounded-lg focus:outline-none focus:border-[#7c5cfc] transition duration-150"
        />
      </div>

      {/* 2. Soft Skills */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-gray-400 font-['DM_Sans',sans-serif]">
          Soft Skills
        </label>
        <input
          type="text"
          value={data?.softSkills || ''}
          onChange={(e) => handleChange('softSkills', e.target.value)}
          placeholder="Team collaboration, Problem solving"
          className="w-full px-4 py-3 text-sm bg-[#12121a] border border-[#2a2a38] text-white rounded-lg focus:outline-none focus:border-[#7c5cfc] transition duration-150"
        />
      </div>

      {/* 3. Languages */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-gray-400 font-['DM_Sans',sans-serif]">
          Languages
        </label>
        <input
          type="text"
          value={data?.languages || ''}
          onChange={(e) => handleChange('languages', e.target.value)}
          placeholder="Bengali (Native), English (Professional)"
          className="w-full px-4 py-3 text-sm bg-[#12121a] border border-[#2a2a38] text-white rounded-lg focus:outline-none focus:border-[#7c5cfc] transition duration-150"
        />
      </div>

      {/* 4. Certifications Block */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-gray-400 font-['DM_Sans',sans-serif]">
          Certifications
        </label>
        <textarea
          value={data?.certifications || ''}
          onChange={(e) => handleChange('certifications', e.target.value)}
          placeholder="Meta Frontend Developer Certificate (Coursera, 2024)"
          rows={4}
          className="w-full px-4 py-3 text-sm bg-[#12121a] border border-[#2a2a38] text-white rounded-lg resize-none focus:outline-none focus:border-[#7c5cfc] transition duration-150 leading-relaxed"
        />
      </div>

    </div>
  );
};

export default SkillsTab;