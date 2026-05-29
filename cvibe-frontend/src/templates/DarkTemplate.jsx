const DarkTemplate = ({ data }) => {
  // 🛡️ সেফটি এবং তোমার personalInfo অবজেক্টের সাথে ম্যাপিং
  const { personalInfo, experience, education, skills } = data || {};
  const { name, title, email, phone, location, summary } = personalInfo || {};

  return (
    <div className="bg-gray-900 text-white w-full min-h-[297mm] p-8 font-sans">

      <div className="pl-4 mb-6 border-l-4 border-purple-400">
        <h1 className="text-3xl font-bold text-white">{name || 'Your Name'}</h1>
        <p className="mt-1 text-lg text-purple-400">{title || 'Your Title'}</p>
        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-400">
          {email && <span>✉ {email}</span>}
          {phone && <span>✆ {phone}</span>}
          {location && <span>⌖ {location}</span>}
        </div>
      </div>

      {summary && (
        <div className="mb-5">
          <h2 className="mb-2 text-sm font-bold tracking-wider text-purple-400 uppercase">
            Summary
          </h2>
          <p className="text-sm leading-relaxed text-gray-300">{summary}</p>
        </div>
      )}

      {experience?.length > 0 && (
        <div className="mb-5">
          <h2 className="mb-3 text-sm font-bold tracking-wider text-purple-400 uppercase">
            Experience
          </h2>
          {experience.map((exp, i) => (
            <div key={i} className="pl-3 mb-3 border-l border-gray-700">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold text-white">{exp.position}</p>
                  <p className="text-sm text-purple-400">{exp.company}</p>
                </div>
                <p className="text-sm text-gray-500">{exp.duration}</p>
              </div>
              {exp.description && (
                <p className="mt-1 text-sm text-gray-400">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {skills?.length > 0 && (
        <div>
          <h2 className="mb-3 text-sm font-bold tracking-wider text-purple-400 uppercase">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span key={i} className="px-3 py-1 text-sm text-purple-300 border border-purple-400 rounded">
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