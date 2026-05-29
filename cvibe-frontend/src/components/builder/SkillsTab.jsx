import { useState } from 'react';

const SkillsTab = ({ data, onChange }) => {
  const [input, setInput] = useState('');
  const skills = data?.skills || [];

  const addSkill = () => {
    if (input.trim() && !skills.includes(input.trim())) {
      onChange({
        ...data,
        skills: [...skills, input.trim()]
      });
      setInput('');
    }
  };

  const removeSkill = (skill) => {
    onChange({
      ...data,
      skills: skills.filter((s) => s !== skill)
    });
  };

  return (
    <div className="flex flex-col gap-4 text-[#f0f0f8]">

      {/* Title */}
      <h3 className="font-semibold text-gray-200">Skills</h3>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addSkill()}
          placeholder="React, Node.js, MongoDB..."
          className="flex-1 px-3 py-2 text-sm bg-[#111118] border border-gray-700 text-white rounded-lg focus:outline-none focus:border-[#7c5cfc]"
        />

        <button
          onClick={addSkill}
          className="px-4 py-2 text-sm text-white transition bg-[#7c5cfc] rounded-lg hover:bg-[#6a4ae8] cursor-pointer"
        >
          Add
        </button>
      </div>

      {/* Skills list — Badge text color matches soft brand purple */}
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="flex items-center gap-2 px-3 py-1 text-sm text-[#b69eff] bg-[#111118] border border-gray-700 rounded-full"
          >
            {skill}

            <button
              onClick={() => removeSkill(skill)}
              className="text-red-400 cursor-pointer hover:text-red-500"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      {/* Empty state */}
      {skills.length === 0 && (
        <p className="text-sm text-gray-500">
          Type a skill and press Enter or click Add
        </p>
      )}
    </div>
  );
};

export default SkillsTab;