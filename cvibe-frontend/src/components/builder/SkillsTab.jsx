import { useState } from 'react';
import KeywordExtractor from '../ai/KeywordExtractor';

const SkillsTab = ({ cvData: data, setCvData: onChange }) => {
  const [input, setInput] = useState('');
  const skills = data?.skills || [];

  const handleChange = (field, value) => {
    if (onChange) {
      onChange({
        ...data,
        [field]: value
      });
    }
  };

  const addSkill = (skill) => {
    const trimmed = skill.trim();
    if (trimmed && !skills.includes(trimmed) && onChange) {
      onChange({ 
        ...data, 
        skills: [...skills, trimmed] 
      });
    }
  };

  const removeSkill = (skillToRemove) => {
    if (onChange) {
      onChange({ 
        ...data, 
        skills: skills.filter((s) => s !== skillToRemove) 
      });
    }
  };

  const handleAiAddSkill = (skill) => {
    const trimmed = typeof skill === 'string' ? skill.trim() : skill;
    if (trimmed && onChange) {
      const updatedSkills = skills.includes(trimmed) ? skills : [...skills, trimmed];
      
      onChange((prevData) => {
        const currentData = prevData || data || {};
        return {
          ...currentData,
          aiUsed: true,
          aiUses: (currentData.aiUses || 0) + 1, 
          skills: updatedSkills
        };
      });
    }
  };

  const inputStyle = "w-full px-4 py-3 text-sm bg-[#141420] border border-[#2a2a42] text-white rounded-xl focus:outline-none focus:border-[#7766ba] focus:ring-1 focus:ring-[#7c5cfc] focus:shadow-[0_0_12px_rgba(124,92,252,0.25)] transition-all duration-150 placeholder-[#9d9db7] font-['DM_Sans',sans-serif]";
  const labelStyle = "text-[13px] font-medium text-[#a2a2bc] font-['DM_Sans',sans-serif]";

  return (
    <div className="space-y-5 w-full text-[#f0f0f8]">
      
      {/* Skills Tags Input */}
      <div className="flex flex-col gap-1.5">
        <label className={labelStyle}>
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
            className="flex-1 px-4 py-3 text-sm bg-[#141420] border border-[#2a2a42] text-white rounded-xl focus:outline-none focus:border-[#7766ba] focus:ring-1 focus:ring-[#7c5cfc] focus:shadow-[0_0_12px_rgba(124,92,252,0.25)] transition-all duration-150 placeholder-[#9d9db7] font-['DM_Sans',sans-serif]"
          />
          <button 
            type="button"
            onClick={() => { addSkill(input); setInput(''); }}
            className="bg-[#7c5cfc] text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-[#6843ec] transition cursor-pointer shadow-md shadow-[#7c5cfc]/20"
          >
            Add
          </button>
        </div>

        {/* Skill Tags List */}
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill, i) => (
              <span 
                key={i}
                className="bg-[#1c1c2b] text-[#a586ff] border border-[#2a2a42] px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 font-['DM_Sans',sans-serif] shadow-sm"
              >
                {skill}
                <button 
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="text-gray-400 transition cursor-pointer hover:text-red-400"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="mt-2">
          <KeywordExtractor onAddSkill={handleAiAddSkill} />
        </div>
      </div>

      {/* Technical Skills */}
      <div className="flex flex-col gap-1.5">
        <label className={labelStyle}>
          Technical Skills
        </label>
        <input
          type="text"
          value={data?.technicalSkills || ''}
          onChange={(e) => handleChange('technicalSkills', e.target.value)}
          placeholder="React, Node.js, MongoDB, Python, Git"
          className={inputStyle}
        />
      </div>

      {/* Soft Skills */}
      <div className="flex flex-col gap-1.5">
        <label className={labelStyle}>
          Soft Skills
        </label>
        <input
          type="text"
          value={data?.softSkills || ''}
          onChange={(e) => handleChange('softSkills', e.target.value)}
          placeholder="Team collaboration, Problem solving, Communication"
          className={inputStyle}
        />
      </div>

      {/* Languages */}
      <div className="flex flex-col gap-1.5">
        <label className={labelStyle}>
          Languages
        </label>
        <input
          type="text"
          value={data?.languages || ''}
          onChange={(e) => handleChange('languages', e.target.value)}
          placeholder="Bengali (Native), English (Professional)"
          className={inputStyle}
        />
      </div>

      {/* Certifications */}
      <div className="flex flex-col gap-1.5">
        <label className={labelStyle}>
          Certifications
        </label>
        <textarea
          rows={3}
          value={data?.certifications || ''}
          onChange={(e) => handleChange('certifications', e.target.value)}
          placeholder="Meta Frontend Developer Certificate (Coursera, 2024)"
          className={`${inputStyle} resize-y leading-relaxed`}
        />
      </div>

    </div>
  );
};

export default SkillsTab;