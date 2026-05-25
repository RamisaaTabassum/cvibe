import { useState } from 'react';

const SkillsTab = ({ data, onChange }) => {
  const [input, setInput] = useState('');
  const skills = data?.skills || [];

  const addSkill = () => {
    if (input.trim() && !skills.includes(input.trim())) {
      onChange({ ...data, skills: [...skills, input.trim()] });
      setInput('');
    }
  };

  const removeSkill = (skill) => {
    onChange({ ...data, skills: skills.filter((s) => s !== skill) });
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-semibold text-gray-700">Skills</h3>
      <div className="flex gap-2">
        <input type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addSkill()}
          placeholder="React, Node.js, MongoDB..."
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
        />
        <button onClick={addSkill} className="px-4 py-2 text-sm text-white transition bg-purple-600 rounded-lg hover:bg-purple-700">Add</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <span key={i} className="flex items-center gap-1 px-3 py-1 text-sm text-purple-800 bg-purple-100 rounded-full">
            {skill}
            <button onClick={() => removeSkill(skill)} className="text-purple-400 hover:text-red-500">×</button>
          </span>
        ))}
      </div>
      {skills.length === 0 && (
        <p className="text-sm text-gray-400">Type a skill and click Add or press Enter</p>
      )}
    </div>
  );
};

export default SkillsTab;