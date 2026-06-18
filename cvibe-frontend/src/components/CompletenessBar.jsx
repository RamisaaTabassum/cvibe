
export default function CompletenessBar({ data }) {
  // 🔍 Defensive condition checks to verify completed fields safely
  const hasName = data?.personalInfo?.name?.trim().length > 0;
  
  const hasSummary = data?.personalInfo?.summary?.trim().length > 0;

  // Handles both array structures and raw string data variants cleanly
  const hasEducation = Array.isArray(data?.education) 
    ? data.education.length > 0 && Object.values(data.education[0] || {}).some(val => val?.trim?.() !== '')
    : !!data?.education?.trim?.();

  const hasSkills = Array.isArray(data?.skills)
    ? data.skills.length > 0 
    : !!data?.skills?.trim?.();

  // 📐 Percentage Calculation Matrix
  const checklist = [
    { id: 'name', label: 'Add your name', isDone: hasName },
    { id: 'edu', label: 'Add education', isDone: hasEducation },
    { id: 'skills', label: 'Add skills', isDone: hasSkills },
    { id: 'summary', label: 'Add a summary', isDone: hasSummary },
  ];

  const completedCount = checklist.filter(item => item.isDone).length;
  const percentage = Math.round((completedCount / checklist.length) * 100);

  return (
    <div className="comp-box">
      {/* Metrics Header Label Line */}
      <div className="comp-lbl">
        <span>CV Completeness</span>
        <span id="comp-pct">{percentage}%</span>
      </div>

      {/* Visual Dynamic Linear Progress Fill Track */}
      <div className="comp-bar">
        <div 
          className="comp-fill" 
          id="comp-fill" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {/* Interactive Status Indicator Checks Checklist */}
      <div className="comp-tips">
        {checklist.map((item) => (
          <div 
            key={item.id} 
            className={`ctip ${item.isDone ? 'done' : ''}`}
            style={{ color: item.isDone ? '#5cfcb8' : 'var(--muted)' }}
          >
            {item.isDone ? '✓' : '○'} {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}