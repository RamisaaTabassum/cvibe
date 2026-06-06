
export default function CVPreview({ data }) {
  // 🛡️ Safe extraction using optional chaining and default structural fallbacks
  const personalInfo = data?.personalInfo || {};
  const education = data?.education || [];
  const experience = data?.experience || [];
  
  // Clean cross-compatibility fallbacks for the updated skills schema
  const technicalSkills = data?.technicalSkills || data?.skills || '';
  const softSkills = data?.softSkills || '';
  const languages = data?.languages || '';
  const certifications = data?.certifications || '';

  return (
    <div className="p-8 text-black bg-white rounded-lg shadow-md preview-container">
      {/* Example header usage */}
      <div className="pb-4 mb-4 border-b">
        <h1 className="text-2xl font-bold">{personalInfo.name || 'Your Name'}</h1>
        <p className="text-gray-600">{personalInfo.title || 'Professional Title'}</p>
        <p className="text-sm text-gray-500">
          {personalInfo.email} {personalInfo.phone ? `| ${personalInfo.phone}` : ''}
        </p>
      </div>

      {/* Rest of your preview template layouts below... */}
    </div>
  );
}