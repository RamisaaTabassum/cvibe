const PurpleTemplate = ({ data }) => {
  const { name, title, email, phone, location, summary,
          experience, education, skills } = data;

  return (
    <div className="bg-white w-full min-h-[297mm] p-8 font-sans">
      
      <div className="bg-purple-600 text-white p-6 rounded-lg mb-6">
        <h1 className="text-3xl font-bold">{name || 'Your Name'}</h1>
        <p className="text-purple-200 text-lg mt-1">{title || 'Your Title'}</p>
        <div className="flex gap-4 mt-3 text-sm text-purple-100 flex-wrap">
          {email && <span>✉ {email}</span>}
          {phone && <span>✆ {phone}</span>}
          {location && <span>⌖ {location}</span>}
        </div>
      </div>

      {summary && (
        <div className="mb-5">
          <h2 className="text-purple-600 font-bold text-lg border-b-2 border-purple-200 pb-1 mb-2">
            Summary
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">{summary}</p>
        </div>
      )}

      {experience?.length > 0 && (
        <div className="mb-5">
          <h2 className="text-purple-600 font-bold text-lg border-b-2 border-purple-200 pb-1 mb-3">
            Experience
          </h2>
          {experience.map((exp, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-800">{exp.position}</p>
                  <p className="text-purple-600 text-sm">{exp.company}</p>
                </div>
                <p className="text-gray-500 text-sm">{exp.duration}</p>
              </div>
              {exp.description && (
                <p className="text-gray-600 text-sm mt-1">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {education?.length > 0 && (
        <div className="mb-5">
          <h2 className="text-purple-600 font-bold text-lg border-b-2 border-purple-200 pb-1 mb-3">
            Education
          </h2>
          {education.map((edu, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold text-gray-800">{edu.degree}</p>
                  <p className="text-purple-600 text-sm">{edu.institution}</p>
                </div>
                <p className="text-gray-500 text-sm">{edu.year}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {skills?.length > 0 && (
        <div>
          <h2 className="text-purple-600 font-bold text-lg border-b-2 border-purple-200 pb-1 mb-3">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span key={i} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
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