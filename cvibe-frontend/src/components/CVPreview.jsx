
const CVPreview = ({ data, template = 'dark' }) => {
  
  const getHeaderBg = () => {
    if (template === 'purple') return 'bg-[#7c5cfc] text-white';
    if (template === 'bold') return 'bg-[#fc5c7d] text-white';
    return 'bg-[#111118] text-white'; // Default Dark Template Banner (As seen in SS)
  };

  return (
    <div className="w-full max-w-[850px] mx-auto bg-white text-slate-900 rounded-lg shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300">
      
      {/* 🎩 SCREENSHOT MATCHING TOP BANNER */}
      <div className={`p-6 sm:p-8 ${getHeaderBg()} text-left space-y-1 transition-colors duration-200`}>
        <h2 className="text-xl font-bold tracking-wider uppercase font-['DM_Sans',sans-serif]">
          {data.personalInfo?.name || 'YOUR NAME'}
        </h2>
        <p className="text-[12px] font-medium tracking-wide opacity-90 italic font-['DM_Sans',sans-serif]">
          {data.personalInfo?.title || 'Job Title / Objective'}
        </p>
        
        {/* কন্টাক্ট ইনফো রো */}
        <div className="pt-2 text-[11px] opacity-80 flex flex-wrap gap-x-4 gap-y-1 font-['DM_Sans',sans-serif]">
          <span>{data.personalInfo?.email || 'email@example.com'}</span>
          <span>{data.personalInfo?.phone || '+880 XXXXXXXXXX'}</span>
          <span>{data.personalInfo?.location || 'Location'}</span>
        </div>
      </div>

      {/* 📄 WHITE PAPER SHEET BODY */}
      <div className="p-6 sm:p-8 min-h-[600px] bg-white text-left space-y-6 font-['DM_Sans',sans-serif]">
        
        {/* SUMMARY SECTION */}
        <div className="space-y-1">
          <h3 className="text-[12px] font-bold tracking-widest text-[#7c5cfc] uppercase">Summary</h3>
          <div className="w-full h-[1px] bg-gray-100 mb-2"></div>
          <p className="text-[12px] text-slate-600 leading-relaxed text-justify">
            {data.personalInfo?.summary || 'Your summary will appear here...'}
          </p>
        </div>

        {/* EDUCATION SECTION */}
        <div className="space-y-1">
          <h3 className="text-[12px] font-bold tracking-widest text-[#7c5cfc] uppercase">Education</h3>
          <div className="w-full h-[1px] bg-gray-100 mb-2"></div>
          {data.education?.length > 0 ? (
            data.education.map((edu, idx) => (
              <div key={idx} className="text-[12px] text-slate-600">
                <span className="font-semibold text-slate-800">{edu.degree}</span> - {edu.school}
              </div>
            ))
          ) : (
            <div className="text-[12px] text-slate-400 space-y-0.5">
              <div className="font-semibold text-slate-400">Degree</div>
              <div>Institution</div>
            </div>
          )}
        </div>

        {/* EXPERIENCE SECTION */}
        <div className="space-y-1">
          <h3 className="text-[12px] font-bold tracking-widest text-[#7c5cfc] uppercase">Experience</h3>
          <div className="w-full h-[1px] bg-gray-100 mb-2"></div>
          {data.experience?.length > 0 ? (
            data.experience.map((exp, idx) => (
              <div key={idx} className="text-[12px] text-slate-600">
                <span className="font-semibold text-slate-800">{exp.position}</span> at {exp.company}
              </div>
            ))
          ) : (
            <div className="text-[12px] text-slate-400 space-y-0.5">
              <div className="font-semibold text-slate-400">Job Title</div>
              <div>Company</div>
            </div>
          )}
        </div>

        {/* SKILLS SECTION */}
        <div className="space-y-1">
          <h3 className="text-[12px] font-bold tracking-widest text-[#7c5cfc] uppercase">Skills</h3>
          <div className="w-full h-[1px] bg-gray-100 mb-2"></div>
          <p className="text-[12px] text-slate-600">
            {data.skills?.length > 0 
              ? data.skills.map(s => typeof s === 'string' ? s : s.name).join(', ') 
              : 'Skills will appear here...'}
          </p>
        </div>

        {/* CERTIFICATIONS SECTION */}
        <div className="space-y-1">
          <h3 className="text-[12px] font-bold tracking-widest text-[#7c5cfc] uppercase">Certifications</h3>
          <div className="w-full h-[1px] bg-gray-100 mb-2"></div>
          <p className="text-[12px] text-slate-400">Certifications will appear here...</p>
        </div>

      </div>

    </div>
  );
};

export default CVPreview;