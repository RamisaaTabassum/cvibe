import { useState } from 'react';
import KeywordExtractor from '../ai/KeywordExtractor';

const SkillsTab = ({ data, onChange }) => {
  const [input, setInput] = useState('');
  const skills = data?.skills || [];

  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const addSkill = (skill) => {
    const trimmed = skill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      onChange({ ...data, skills: [...skills, trimmed] });
    }
  };

  const removeSkill = (skill) => {
    onChange({ ...data, skills: skills.filter((s) => s !== skill) });
  };

  return (
    <div className="space-y-4 w-full text-[#f0f0f8]">
      
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-gray-400 font-['DM_Sans',sans-serif]">
          Add Skills Tags
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { 
              if (e.key === 'Enter') { 
                e.preventDefault(); 
                addSkill(input); 
                setInput(''); 
              } 
            }}
            placeholder="Type a skill and press Enter"
            className="flex-1 px-4 py-3 text-sm bg-[#12121a] border border-[#2a2a38] text-white rounded-lg focus:outline-none focus:border-[#7c5cfc] transition duration-150"
          />
          <button 
            type="button"
            onClick={() => { addSkill(input); setInput(''); }}
            className="bg-[#7c5cfc] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#694bd9] transition cursor-pointer"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {skills.map((skill, i) => (
            <span 
              key={i}
              className="bg-[#1c1c2b] text-[#7c5cfc] border border-[#2a2a38] px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 font-['DM_Sans',sans-serif]"
            >
              {skill}
              <button 
                type="button"
                onClick={() => removeSkill(skill)}
                className="text-gray-500 transition cursor-pointer hover:text-red-500"
              >
                ✕
              </button>
            </span>
          ))}
        </div>

        <div className="mt-2">
          <KeywordExtractor onAddSkill={addSkill} />
        </div>
      </div>

      {/* Technical Skills */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-gray-400 font-['DM_Sans',sans-serif]">
          Technical Skills
        </label>
        <input
          type="text"
          value={data?.technicalSkills || ''}
          onChange={(e) => handleChange('technicalSkills', e.target.value)}
          placeholder="React, Node.js, MongoDB, Python, Git"
          className="w-full px-4 py-3 text-sm bg-[#12121a] border border-[#2a2a38] text-white rounded-lg focus:outline-none focus:border-[#7c5cfc] transition duration-150"
        />
      </div>

      
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-gray-400 font-['DM_Sans',sans-serif]">
          Soft Skills
        </label>
        <input
          type="text"
          value={data?.softSkills || ''}
          onChange={(e) => handleChange('softSkills', e.target.value)}
          placeholder="Team collaboration, Problem solving"
          className="w-full px-4 py-3 text-sm bg-[#12121a] border border-[#2a2a38] text-white rounded-lg focus:outline-none focus:border-[#7c5cfc] transition duration-150"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-gray-400 font-['DM_Sans',sans-serif]">
          Languages
        </label>
        <input
          type="text"
          value={data?.languages || ''}
          onChange={(e) => handleChange('languages', e.target.value)}
          placeholder="Bengali (Native), English (Professional)"
          className="w-full px-4 py-3 text-sm bg-[#12121a] border border-[#2a2a38] text-white rounded-lg focus:outline-none focus:border-[#7c5cfc] transition duration-150"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-gray-400 font-['DM_Sans',sans-serif]">
          Certifications
        </label>
        <textarea
          rows={3}
          value={data?.certifications || ''}
          onChange={(e) => handleChange('certifications', e.target.value)}
          placeholder="Meta Frontend Developer Certificate (Coursera, 2024)"
          className="w-full px-4 py-3 text-sm bg-[#12121a] border border-[#2a2a38] text-white rounded-lg focus:outline-none focus:border-[#7c5cfc] transition duration-150 resize-y"
        />
      </div>

    </div>
  );
};

export default SkillsTab;