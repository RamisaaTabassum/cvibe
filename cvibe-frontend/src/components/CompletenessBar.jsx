export default function CompletenessBar({ data }) {
  // ১. Personal Info Check 
  const hasName = Boolean(
    data?.personalInfo?.name?.trim() || 
    data?.personalInfo?.fullName?.trim()
  );

  // ২. Education Check
  const hasEducation = Array.isArray(data?.education) && data.education.length > 0 && data.education.some(
    edu => edu?.degree?.trim() || edu?.institution?.trim()
  );

  const hasExperience = Array.isArray(data?.experience) && data.experience.length > 0 && data.experience.some(
    exp => exp?.position?.trim() || exp?.jobTitle?.trim() || exp?.company?.trim()
  );

  const hasSkills = Boolean(
    (Array.isArray(data?.skills) && data.skills.length > 0) ||
    data?.technicalSkills?.trim() ||
    data?.softSkills?.trim()
  );

  const hasAi = Boolean(
    data?.aiUsed || 
    (Array.isArray(data?.aiKeywords) && data.aiKeywords.length > 0) || 
    data?.jobDescription?.trim()
  );

  const checklist = [
    { id: 'name', label: 'Add personal info', isDone: hasName },
    { id: 'edu', label: 'Add education history', isDone: hasEducation },
    { id: 'exp', label: 'Add work experience', isDone: hasExperience },
    { id: 'skills', label: 'Add your skills', isDone: hasSkills },
    { id: 'ai', label: 'Use AI optimization', isDone: hasAi },
  ];

  const completedCount = checklist.filter(item => item.isDone).length;
  const percentage = Math.round((completedCount / checklist.length) * 100);

  return (
    <div className="mt-8 p-5 bg-[#12121a] border border-[#222233] rounded-xl">
      <div className="flex items-center justify-between text-xs font-bold tracking-wide text-gray-400 mb-2.5 font-['DM_Sans',sans-serif]">
        <span>CV Completeness</span>
        <span className="text-[#4ade80]">{percentage}%</span>
      </div>
      
      <div className="w-full h-1.5 bg-[#1c1c2b] rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#4ade80] rounded-full transition-all duration-500" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <div className="mt-4 space-y-2 text-[12px] text-gray-400 font-['DM_Sans',sans-serif]">
        {checklist.map((item) => (
          <div 
            key={item.id} 
            className={`flex items-center gap-2 ${item.isDone ? 'text-[#4ade80] font-medium' : 'text-gray-500'}`}
          >
            <span className="text-sm leading-none">{item.isDone ? '✓' : '⚪'}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}