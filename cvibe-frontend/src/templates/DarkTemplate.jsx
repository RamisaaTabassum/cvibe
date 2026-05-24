const DarkTemplate = ({ data }) => {
  const { name, title, email, phone, location, summary,
          experience, education, skills } = data;

  return (
    <div className="bg-gray-900 text-white w-full min-h-[297mm] p-8 font-sans">

      <div className="border-l-4 border-purple-400 pl-4 mb-6">
        <h1 className="text-3xl font-bold text-white">{name || 'Your Name'}</h1>
        <p className="text-purple-400 text-lg mt-1">{title || 'Your Title'}</p>
        <div className="flex gap-4 mt-2 text-sm text-gray-400 flex-wrap">
          {email && <span>✉ {email}</span>}
          {phone && <span>✆ {phone}</span>}
          {location && <span>⌖ {location}</span>}
        </div>
      </div>

      {summary && (
        <div className="mb-5">
          <h2 className="text-purple-400 font-bold text-lg mb-2 uppercase tracking-wider text-sm">
            Summary
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">{summary}</p>
        </div>
      )}

      {experience?.length > 0 && (
        <div className="mb-5">
          <h2 className="text-purple-400 font-bold uppercase tracking-wider text-sm mb-3">
            Experience
          </h2>
          {experience.map((exp, i) => (
            <div key={i} className="mb-3 pl-3 border-l border-gray-700">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold text-white">{exp.position}</p>
                  <p className="text-purple-400 text-sm">{exp.company}</p>
                </div>
                <p className="text-gray-500 text-sm">{exp.duration}</p>
              </div>
              {exp.description && (
                <p className="text-gray-400 text-sm mt-1">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {skills?.length > 0 && (
        <div>
          <h2 className="text-purple-400 font-bold uppercase tracking-wider text-sm mb-3">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span key={i} className="border border-purple-400 text-purple-300 px-3 py-1 rounded text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DarkTemplate;