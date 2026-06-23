const RedTemplate = ({ data }) => {
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
    <div className="w-full min-h-[297mm] bg-white text-gray-800 font-sans flex flex-col overflow-hidden rounded-xl">
      
      {/* Header Section */}
      <div className="bg-[#241616] text-white p-8 md:p-10 flex flex-col justify-center">
        <h1 className="text-2xl italic font-black tracking-wider text-white uppercase md:text-3xl">
          {name || 'Your Name'}
        </h1>
        <p className="mt-1 text-sm italic text-gray-300 md:text-base">
          {title || 'Job Title / Objective'}
        </p>
        
        <div className="flex flex-wrap mt-4 text-xs text-gray-400 gap-x-6 gap-y-1 md:text-sm">
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
          <div className="border-b border-gray-200 pb-1.5 mb-2.5">
            <h2 className="text-xs font-bold tracking-widest text-[#b91c1c] uppercase">
              Summary
            </h2>
          </div>
          {summary ? (
            <p className="text-sm leading-relaxed text-gray-600 whitespace-pre-line">{summary}</p>
          ) : (
            <p className="text-sm italic text-gray-400">Your summary will appear here...</p>
          )}
        </div>

        {/* Education Section */}
        <div>
          <div className="border-b border-gray-200 pb-1.5 mb-2.5">
            <h2 className="text-xs font-bold tracking-widest text-[#b91c1c] uppercase">
              Education
            </h2>
          </div>
          {education?.length > 0 && (education[0]?.degree || education[0]?.institution) ? (
            <div className="space-y-4">
              {education.map((edu, i) => (
                <div key={i} className="text-sm">
                  <div className="flex items-baseline justify-between font-semibold text-gray-700">
                    <p>{edu.degree || 'Degree'}</p>
                    {(edu.startYear || edu.endYear) && (
                      <span className="text-xs font-normal text-gray-400">
                        {edu.startYear} {edu.endYear ? ` - ${edu.endYear}` : ''}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 italic mt-0.5">{edu.institution || 'Institution'}</p>
                  {(edu.cgpa || edu.CGPA) && (
                    <p className="mt-1 text-xs font-medium text-gray-600">CGPA: {edu.cgpa || edu.CGPA}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm">
              <p className="font-medium text-gray-400">Degree / Program</p>
              <p className="text-xs text-gray-400 italic mt-0.5">Institution Name</p>
            </div>
          )}
        </div>

        {/* Experience Section */}
        <div>
          <div className="border-b border-gray-200 pb-1.5 mb-2.5">
            <h2 className="text-xs font-bold tracking-widest text-[#b91c1c] uppercase">
              Experience
            </h2>
          </div>
          {experience?.length > 0 && (experience[0]?.jobTitle || experience[0]?.position || experience[0]?.company) ? (
            <div className="space-y-4">
              {experience.map((exp, i) => (
                <div key={i} className="text-sm">
                  <div className="flex items-baseline justify-between font-semibold text-gray-700">
                    <p>{exp.jobTitle || exp.position || 'Job Title'}</p>
                    {(exp.startDate || exp.duration) && (
                      <span className="text-xs font-normal text-gray-400">
                        {exp.startDate || exp.duration}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 italic mt-0.5">{exp.company || 'Company'}</p>
                  {exp.description && (
                    <p className="mt-1.5 text-xs leading-relaxed text-gray-600 whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm">
              <p className="font-medium text-gray-400">Job Title / Position</p>
              <p className="text-xs text-gray-400 italic mt-0.5">Company Name</p>
            </div>
          )}
        </div>

        {/* Skills & Languages Section */}
        <div>
          <div className="border-b border-gray-200 pb-1.5 mb-2.5">
            <h2 className="text-xs font-bold tracking-widest text-[#b91c1c] uppercase">
              Skills & Languages
            </h2>
          </div>
          {(technicalSkills || softSkills || languages || skills?.length > 0) ? (
            <div className="space-y-2 text-sm leading-relaxed">
              {technicalSkills && (
                <p className="text-gray-600"><strong className="font-medium text-gray-700">Technical Skills:</strong> {technicalSkills}</p>
              )}
              {softSkills && (
                <p className="text-gray-600"><strong className="font-medium text-gray-700">Soft Skills:</strong> {softSkills}</p>
              )}
              {languages && (
                <p className="text-gray-600"><strong className="font-medium text-gray-700">Languages:</strong> {languages}</p>
              )}
              {!technicalSkills && !softSkills && !languages && skills && (
                <p className="text-gray-600">{Array.isArray(skills) ? skills.join(", ") : skills}</p>
              )}
            </div>
          ) : (
            <p className="text-sm italic text-gray-400">Skills will appear here...</p>
          )}
        </div>

        <div>
          <div className="border-b border-gray-200 pb-1.5 mb-2.5">
            <h2 className="text-xs font-bold tracking-widest text-[#b91c1c] uppercase">
              Certifications
            </h2>
          </div>
          {certifications && certifications.trim().length > 0 ? (
            <p className="text-sm leading-relaxed text-gray-600 whitespace-pre-line">
              {certifications}
            </p>
          ) : (
            <p className="text-sm italic text-gray-400">Certifications will appear here...</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default RedTemplate;