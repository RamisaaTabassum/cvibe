const PurpleTemplate = ({ data }) => {
  // 🛡️ সেফটি এবং তোমার personalInfo অবজেক্টের সাথে ম্যাপিং
  const { personalInfo, experience, education, skills } = data || {};
  const { name, title, email, phone, location, summary } = personalInfo || {};

  return (
    <div className="bg-white w-full min-h-[297mm] p-8 font-sans">
      
      <div className="p-6 mb-6 text-white bg-purple-600 rounded-lg">
        <h1 className="text-3xl font-bold">{name || 'Your Name'}</h1>
        <p className="mt-1 text-lg text-purple-200">{title || 'Your Title'}</p>
        <div className="flex flex-wrap gap-4 mt-3 text-sm text-purple-100">
          {email && <span>✉ {email}</span>}
          {phone && <span>✆ {phone}</span>}
          {location && <span>⌖ {location}</span>}
        </div>
      </div>

      {summary && (
        <div className="mb-5">
          <h2 className="pb-1 mb-2 text-lg font-bold text-purple-600 border-b-2 border-purple-200">
            Summary
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">{summary}</p>
        </div>
      )}

      {experience?.length > 0 && (
        <div className="mb-5">
          <h2 className="pb-1 mb-3 text-lg font-bold text-purple-600 border-b-2 border-purple-200">
            Experience
          </h2>
          {experience.map((exp, i) => (
            <div key={i} className="mb-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-gray-800">{exp.position}</p>
                  <p className="text-sm text-purple-600">{exp.company}</p>
                </div>
                <p className="text-sm text-gray-500">{exp.duration}</p>
              </div>
              {exp.description && (
                <p className="mt-1 text-sm text-gray-600">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {education?.length > 0 && (
        <div className="mb-5">
          <h2 className="pb-1 mb-3 text-lg font-bold text-purple-600 border-b-2 border-purple-200">
            Education
          </h2>
          {education.map((edu, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold text-gray-800">{edu.degree}</p>
                  <p className="text-sm text-purple-600">{edu.institution}</p>
                </div>
                <p className="text-sm text-gray-500">{edu.year}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {skills?.length > 0 && (
        <div>
          <h2 className="pb-1 mb-3 text-lg font-bold text-purple-600 border-b-2 border-purple-200">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span key={i} className="px-3 py-1 text-sm text-purple-800 bg-purple-100 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PurpleTemplate;