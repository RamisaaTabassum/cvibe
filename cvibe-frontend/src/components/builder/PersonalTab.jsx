
const PersonalTab = ({ data, onChange }) => {
  // Pure immutable structural state modifier update function
  const handleChange = (field, value) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-4 w-full text-[#f0f0f8]">
      
      {/* 1. Full Name (Full Width Block) */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-gray-400 font-['DM_Sans',sans-serif]">
          Full Name
        </label>
        <input
          type="text"
          value={data?.personalInfo?.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="e.g. Your Name"
          className="w-full px-4 py-3 text-sm bg-[#12121a] border border-[#2a2a38] text-white rounded-lg focus:outline-none focus:border-[#7c5cfc] transition duration-150"
        />
      </div>

      {/* 2. Job Title / Objective (Full Width Block) */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-gray-400 font-['DM_Sans',sans-serif]">
          Job Title / Objective
        </label>
        <input
          type="text"
          value={data?.personalInfo?.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="e.g. Software Engineer | Fresh Graduate"
          className="w-full px-4 py-3 text-sm bg-[#12121a] border border-[#2a2a38] text-white rounded-lg focus:outline-none focus:border-[#7c5cfc] transition duration-150"
        />
      </div>

      {/* 3. Side-by-Side Dual Column Flex Grid: Email & Phone */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-gray-400 font-['DM_Sans',sans-serif]">
            Email
          </label>
          <input
            type="email"
            value={data?.personalInfo?.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-3 text-sm bg-[#12121a] border border-[#2a2a38] text-white rounded-lg focus:outline-none focus:border-[#7c5cfc] transition duration-150"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-gray-400 font-['DM_Sans',sans-serif]">
            Phone
          </label>
          <input
            type="text"
            value={data?.personalInfo?.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+880 1700 000000"
            className="w-full px-4 py-3 text-sm bg-[#12121a] border border-[#2a2a38] text-white rounded-lg focus:outline-none focus:border-[#7c5cfc] transition duration-150"
          />
        </div>
      </div>

      {/* 4. Side-by-Side Dual Column Flex Grid: Location & LinkedIn */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-gray-400 font-['DM_Sans',sans-serif]">
            Location
          </label>
          <input
            type="text"
            value={data?.personalInfo?.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="Chittagong, Bangladesh"
            className="w-full px-4 py-3 text-sm bg-[#12121a] border border-[#2a2a38] text-white rounded-lg focus:outline-none focus:border-[#7c5cfc] transition duration-150"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-gray-400 font-['DM_Sans',sans-serif]">
            LinkedIn / Portfolio
          </label>
          <input
            type="text"
            value={data?.personalInfo?.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/yourname"
            className="w-full px-4 py-3 text-sm bg-[#12121a] border border-[#2a2a38] text-white rounded-lg focus:outline-none focus:border-[#7c5cfc] transition duration-150"
          />
        </div>
      </div>

      {/* 5. Professional Summary Textarea (Full Width Block) */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-gray-400 font-['DM_Sans',sans-serif]">
          Professional Summary
        </label>
        <textarea
          value={data?.personalInfo?.summary || ''}
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder="Write 2–3 sentences about yourself, your skills, and what you're looking for..."
          rows={4}
          className="w-full px-4 py-3 text-sm bg-[#12121a] border border-[#2a2a38] text-white rounded-lg resize-none focus:outline-none focus:border-[#7c5cfc] transition duration-150 leading-relaxed"
        />
      </div>

    </div>
  );
};

export default PersonalTab;