import { useState } from 'react';

const AIToolsTab = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [fixerText, setFixerText] = useState('');

  const handleGetKeywords = () => {
    console.log('Fetching keywords for:', jobDescription);
  };

  const handleFixGrammar = () => {
    console.log('Fixing grammar for:', fixerText);
  };

  return (
    <div className="space-y-5 w-full text-[#f0f0f8]">
      <div className="p-5 bg-[#111118] border border-[#221c38] rounded-xl flex flex-col gap-3">
        <div className="flex items-center gap-1.5 text-[14px] font-semibold text-[#a586ff]">
          <span>✦</span> Keyword Suggestions
        </div>
        <p className="text-[12px] text-gray-400 font-['DM_Sans',sans-serif]">
          Paste a job description to get AI-powered keywords for your CV.
        </p>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste job description here.."
          className="w-full h-28 px-4 py-3 text-sm bg-[#09090d] border border-[#2a2a38] text-white rounded-lg resize-none focus:outline-none focus:border-[#7c5cfc] transition placeholder-gray-600"
        />
        <button
          onClick={handleGetKeywords}
          className="w-fit px-4 py-2 text-xs font-medium text-white bg-[#7c5cfc] rounded-lg hover:bg-[#6a4ae8] transition cursor-pointer flex items-center gap-1"
        >
          <span>✦</span> Get Keywords
        </button>
      </div>

      <div className="p-5 bg-[#111118] border border-[#14291f] rounded-xl flex flex-col gap-3">
        <div className="flex items-center gap-1.5 text-[14px] font-semibold text-[#4ade80]">
          <span>✦</span> Grammar & Tone Fixer
        </div>
        <p className="text-[12px] text-gray-400 font-['DM_Sans',sans-serif]">
          Paste any text and get an improved professional version.
        </p>
        <textarea
          value={fixerText}
          onChange={(e) => setFixerText(e.target.value)}
          placeholder="Paste your text here.."
          className="w-full h-28 px-4 py-3 text-sm bg-[#09090d] border border-[#2a2a38] text-white rounded-lg resize-none focus:outline-none focus:border-[#4ade80] transition placeholder-gray-600"
        />
        <button
          onClick={handleFixGrammar}
          className="w-fit px-4 py-2 text-xs font-medium text-[#4ade80] bg-[#112219] border border-[#1b3d2b] rounded-lg hover:bg-[#162e22] transition cursor-pointer flex items-center gap-1"
        >
          <span>✦</span> Fix & Improve
        </button>
      </div>
    </div>
  );
};

export default AIToolsTab;