const EducationTab = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    const updatedEducation = [...(data?.education || [])];
    
    if (!updatedEducation[0]) {
      updatedEducation[0] = {
        degree: '',
        institution: '',
        startYear: '',
        endYear: '',
        cgpa: ''
      };
    }
    
    updatedEducation[0][field] = value;

    onChange({
      ...data,
      education: updatedEducation
    });
  };

  const currentEdu = data?.education?.[0] || {};

  return (
    <div className="space-y-4 w-full text-[#f0f0f8]">
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-gray-400 font-['DM_Sans',sans-serif]">
          Degree
        </label>
        <input
          type="text"
          value={currentEdu.degree || ''}
          onChange={(e) => handleChange('degree', e.target.value)}
          placeholder="e.g. BSc in Computer Science and Engineering"
          className="w-full px-4 py-3 text-sm bg-[#12121a] border border-[#2a2a38] text-white rounded-lg focus:outline-none focus:border-[#7c5cfc] transition duration-150"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-gray-400 font-['DM_Sans',sans-serif]">
          Institution
        </label>
        <input
          type="text"
          value={currentEdu.institution || ''}
          onChange={(e) => handleChange('institution', e.target.value)}
          placeholder="International Islamic University Chittagong"
          className="w-full px-4 py-3 text-sm bg-[#12121a] border border-[#2a2a38] text-white rounded-lg focus:outline-none focus:border-[#7c5cfc] transition duration-150"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-gray-400 font-['DM_Sans',sans-serif]">
            Start Year
          </label>
          <input
            type="text"
            value={currentEdu.startYear || ''}
            onChange={(e) => handleChange('startYear', e.target.value)}
            placeholder="2020"
            className="w-full px-4 py-3 text-sm bg-[#12121a] border border-[#2a2a38] text-white rounded-lg focus:outline-none focus:border-[#7c5cfc] transition duration-150"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-gray-400 font-['DM_Sans',sans-serif]">
            End Year
          </label>
          <input
            type="text"
            value={currentEdu.endYear || ''}
            onChange={(e) => handleChange('endYear', e.target.value)}
            placeholder="2024 / Present"
            className="w-full px-4 py-3 text-sm bg-[#12121a] border border-[#2a2a38] text-white rounded-lg focus:outline-none focus:border-[#7c5cfc] transition duration-150"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-gray-400 font-['DM_Sans',sans-serif]">
          CGPA
        </label>
        <input
          type="text"
          value={currentEdu.cgpa || ''}
          onChange={(e) => handleChange('cgpa', e.target.value)}
          placeholder="3.72 / 4.00"
          className="w-full px-4 py-3 text-sm bg-[#12121a] border border-[#2a2a38] text-white rounded-lg focus:outline-none focus:border-[#7c5cfc] transition duration-150"
        />
      </div>
    </div>
  );
};

export default EducationTab;