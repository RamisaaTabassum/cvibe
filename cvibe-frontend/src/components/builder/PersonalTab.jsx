const PersonalTab = ({ cvData: data, setCvData: onChange }) => {
  const handleChange = (field, value) => {
    if (onChange) {
      onChange({
        ...data,
        personalInfo: {
          ...data.personalInfo,
          [field]: value
        }
      });
    }
  };

  const inputStyle = "w-full px-4 py-3 text-sm bg-[#141420] border border-[#2a2a42] text-white rounded-xl focus:outline-none focus:border-[#7766ba] focus:ring-1 focus:ring-[#7c5cfc] focus:shadow-[0_0_12px_rgba(124,92,252,0.25)] transition-all duration-150 placeholder-[#9d9db7] font-['DM_Sans',sans-serif]";
  const labelStyle = "text-[13px] font-medium text-[#a2a2bc] font-['DM_Sans',sans-serif]";

  return (
    <div className="space-y-5 w-full text-[#f0f0f8]">
      <div className="flex flex-col gap-1.5">
        <label className={labelStyle}>Full Name</label>
        <input
          type="text"
          value={data?.personalInfo?.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="e.g. Your Name"
          className={inputStyle}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelStyle}>Job Title / Objective</label>
        <input
          type="text"
          value={data?.personalInfo?.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="e.g. Software Engineer | Fresh Graduate"
          className={inputStyle}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className={labelStyle}>Email</label>
          <input
            type="email"
            value={data?.personalInfo?.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="your@email.com"
            className={inputStyle}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelStyle}>Phone</label>
          <input
            type="text"
            value={data?.personalInfo?.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+880 1700 000000"
            className={inputStyle}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className={labelStyle}>Location</label>
          <input
            type="text"
            value={data?.personalInfo?.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="Chittagong, Bangladesh"
            className={inputStyle}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelStyle}>LinkedIn / Portfolio</label>
          <input
            type="text"
            value={data?.personalInfo?.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/yourname"
            className={inputStyle}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelStyle}>Professional Summary</label>
        <textarea
          value={data?.personalInfo?.summary || ''}
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder="Write 2–3 sentences about yourself, your skills, and what you're looking for..."
          rows={4}
          className={`${inputStyle} resize-none leading-relaxed`}
        />
      </div>

      <div className="flex justify-start pt-1">
        <button 
          type="button" 
          className="px-3.5 py-1.5 bg-[#0e241b] border border-[#183c2b] hover:bg-[#123023] text-[#4ade80] text-xs font-semibold rounded-lg flex items-center gap-1.5 transition duration-150 cursor-pointer shadow-sm font-['DM_Sans',sans-serif]"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l2.5 6.5L21 11l-6.5 2.5L12 22l-2.5-6.5L3 11l6.5-2.5z" />
          </svg>
          Fix Grammar
        </button>
      </div>
    </div>
  );
};

export default PersonalTab;