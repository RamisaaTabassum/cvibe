const SkillsTab = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="space-y-4 w-full text-[#f0f0f8]">
      
  
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-gray-400 font-['DM_Sans',sans-serif]">
          Technical Skills
        </label>
        <input
          type="text"
          value={data?.technicalSkills || ''}
          onChange={(e) => handleChange('technicalSkills', e.target.value)}
          placeholder="React, Node.js, MongoDB, Python, Git"
          className="w-full px-4 py-3 text-sm bg-[#12121a] border border-[#2a2a38] text-white rounded-lg focus:outline-none focus:border-[#7c5cfc] transition duration-150"
        />
      </div>

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

    </div>
  );
};

export default SkillsTab;