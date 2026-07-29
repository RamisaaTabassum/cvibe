const PurpleTemplate = ({ data }) => {
  const { 
    personalInfo, 
    experience, 
    education, 
    skills, 
    certifications, 
    technicalSkills, 
    softSkills, 
    languages 
  } = data || {};
  
  const { name, title, email, phone, location, summary } = personalInfo || {};
  const linkedinUrl = personalInfo?.linkedin || personalInfo?.linkedIn || personalInfo?.portfolio || '';

  return (
    <div className="w-full min-h-[297mm] bg-white text-black font-sans flex flex-col overflow-hidden rounded-xl">
      
      {/* Header Section (Design maintained) */}
      <div className="bg-[#7c5cfc] text-white p-8 md:p-10 flex flex-col justify-center">
        <h1 className="text-2xl italic font-black tracking-wider text-white uppercase md:text-3xl">
          {name || 'Your Name'}
        </h1>
        <p className="mt-1 text-sm italic text-purple-100 md:text-base">
          {title || 'Job Title / Objective'}
        </p>
        
        <div className="flex flex-wrap mt-4 text-xs text-purple-200 gap-x-6 gap-y-1 md:text-sm">
          <span>{email || 'email@example.com'}</span>
          <span>{phone || '+880 XXXXXXXXX'}</span>
          <span>{location || 'Location'}</span>
          <span>{linkedinUrl || 'linkedin.com/in/username'}</span>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="flex flex-col flex-1 gap-6 p-8 bg-white md:p-10">
        
        {/* Summary Section */}
        <div>
          <div className="border-b border-black pb-1.5 mb-2.5">
            <h2 className="text-xs font-bold tracking-widest text-black uppercase">
              Summary
            </h2>
          </div>
          {summary ? (
            <p className="text-sm leading-relaxed text-black whitespace-pre-line">{summary}</p>
          ) : (
            <p className="text-sm italic text-black opacity-60">Your summary will appear here...</p>
          )}
        </div>

        {/* Education Section */}
        <div>
          <div className="border-b border-black pb-1.5 mb-2.5">
            <h2 className="text-xs font-bold tracking-widest text-black uppercase">
              Education
            </h2>
          </div>
          {education?.length > 0 && (education[0]?.degree || education[0]?.institution) ? (
            <div className="space-y-4">
              {education.map((edu, i) => (
                <div key={i} className="text-sm text-black">
                  <div className="flex items-baseline justify-between font-semibold">
                    <p>{edu.degree || 'Degree'}</p>
                    {(edu.startYear || edu.endYear) && (
                      <span className="text-xs font-normal">
                        {edu.startYear} {edu.endYear ? ` - ${edu.endYear}` : ''}
                      </span>
                    )}
                  </div>
                  <p className="text-xs italic mt-0.5">{edu.institution || 'Institution'}</p>
                  {(edu.cgpa || edu.CGPA) && (
                    <p className="mt-1 text-xs font-medium">CGPA: {edu.cgpa || edu.CGPA}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-black opacity-60">
              <p className="font-medium">Degree / Program</p>
              <p className="text-xs italic mt-0.5">Institution Name</p>
            </div>
          )}
        </div>

        {/* Experience Section */}
        <div>
          <div className="border-b border-black pb-1.5 mb-2.5">
            <h2 className="text-xs font-bold tracking-widest text-black uppercase">
              Experience
            </h2>
          </div>
          {experience?.length > 0 && (experience[0]?.jobTitle || experience[0]?.position || experience[0]?.company) ? (
            <div className="space-y-4">
              {experience.map((exp, i) => (
                <div key={i} className="text-sm text-black">
                  <div className="flex items-baseline justify-between font-semibold">
                    <p>{exp.jobTitle || exp.position || 'Job Title'}</p>
                    {(exp.startDate || exp.duration) && (
                      <span className="text-xs font-normal">
                        {exp.startDate || exp.duration}
                      </span>
                    )}
                  </div>
                  <p className="text-xs italic mt-0.5">{exp.company || 'Company'}</p>
                  {exp.description && (
                    <p className="mt-1.5 text-xs leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-black opacity-60">
              <p className="font-medium">Job Title / Position</p>
              <p className="text-xs italic mt-0.5">Company Name</p>
            </div>
          )}
        </div>

        {/* Skills & Languages Section */}
        <div>
          <div className="border-b border-black pb-1.5 mb-2.5">
            <h2 className="text-xs font-bold tracking-widest text-black uppercase">
              Skills & Languages
            </h2>
          </div>
          {(technicalSkills || softSkills || languages || skills?.length > 0) ? (
            <div className="space-y-2 text-sm leading-relaxed text-black">
              {technicalSkills && (
                <p><strong className="font-semibold">Technical Skills:</strong> {technicalSkills}</p>
              )}
              {softSkills && (
                <p><strong className="font-semibold">Soft Skills:</strong> {softSkills}</p>
              )}
              {languages && (
                <p><strong className="font-semibold">Languages:</strong> {languages}</p>
              )}
              {!technicalSkills && !softSkills && !languages && skills && (
                <p>{Array.isArray(skills) ? skills.join(", ") : skills}</p>
              )}
            </div>
          ) : (
            <p className="text-sm italic text-black opacity-60">Skills will appear here...</p>
          )}
        </div>

        {/* Certifications Section */}
        <div>
          <div className="border-b border-black pb-1.5 mb-2.5">
            <h2 className="text-xs font-bold tracking-widest text-black uppercase">
              Certifications
            </h2>
          </div>
          {certifications && certifications.trim().length > 0 ? (
            <p className="text-sm leading-relaxed text-black whitespace-pre-line">
              {certifications}
            </p>
          ) : (
            <p className="text-sm italic text-black opacity-60">Certifications will appear here...</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default PurpleTemplate;