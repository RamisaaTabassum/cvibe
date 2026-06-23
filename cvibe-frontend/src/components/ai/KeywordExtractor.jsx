import { useState } from 'react';
import { extractKeywords } from '../../utils/aiApi';

export default function KeywordExtractor({ onAddSkill }) {
  const [jobDesc, setJobDesc] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const bounceTransition = "transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] transform-gpu hover:scale-[1.03] active:scale-[0.97] backface-hidden antialiased";

  const handleExtract = async () => {
    if (!jobDesc.trim()) return;

    setLoading(true);
    setError('');

    try {
      const res = await extractKeywords(jobDesc);
      setKeywords(res.data.keywords);
    } catch (err) {
      setError('AI error — please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-[#13131a] border border-[#262636] rounded-[14px] p-5 overflow-hidden shadow-xl shadow-black/50">
      
      <div className="absolute top-0 right-0 w-[140px] h-[140px] bg-[#7c5cfc]/15 rounded-full blur-[45px] pointer-events-none" />

      <div className="relative z-10">
        <div className="inline-flex items-center gap-1.5 bg-[#7c5cfc]/15 border border-[#7c5cfc]/40 text-[#a78bfa] text-[10px] font-bold py-1 px-2.5 rounded-full uppercase tracking-wider mb-3 select-none">
          ✦ Core Extraction
        </div>

        <h3 className="text-[16px] font-semibold text-[#f3f4f6] mb-1 tracking-wide">
          AI Keyword Extractor
        </h3>
        <p className="text-[13px] text-[#9ca3af] mb-4">
          Paste a job description and AI will suggest relevant keywords.
        </p>

        <textarea
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          placeholder="We are looking for a React developer with Node.js experience..."
          rows={3}
          className="w-full px-4 py-3 mb-4 text-sm bg-[#0d0d12] border border-[#2a2a3d] rounded-[10px] text-[#f3f4f6] placeholder-[#6b7280] resize-none focus:outline-none focus:border-[#7c5cfc] focus:ring-1 focus:ring-[#7c5cfc]/40 transition-all duration-200"
        />

        <button
          onClick={handleExtract}
          disabled={loading || !jobDesc.trim()}
          className={`w-full py-3 text-[14px] font-bold rounded-[10px] transition-all duration-200 cursor-pointer border-none
            ${loading || !jobDesc.trim() 
              ? 'bg-[#7c5cfc] text-[#ebeced] cursor-not-allowed shadow-none' 
              : 'bg-[#6441e3] text-white shadow-lg shadow-[#7c5cfc]/30 hover:bg-[#6d4ae5]'
            } ${bounceTransition}`}
        >
          {loading ? 'AI Processing...' : 'Extract Keywords ↗'}
        </button>

        {error && (
          <p className="mt-3 text-xs font-medium text-red-400">{error}</p>
        )}

        {keywords.length > 0 && (
          <div className="mt-5 border-t border-[#262636] pt-4">
            <p className="text-[11px] text-[#a78bfa] uppercase tracking-wider font-bold mb-3">
              ✦ Click to add to skills
            </p>

            <div className="flex flex-wrap gap-2">
              {keywords.map((kw, i) => (
                <button
                  key={i}
                  onClick={() => onAddSkill && onAddSkill(kw)}
                  className="bg-[#0d0d12] hover:bg-[#7c5cfc] border border-[#383886] hover:border-[#7c5cfc] text-[#e5e7eb] hover:text-white px-3 py-1.5 rounded-full text-xs transition-all duration-200 flex items-center gap-1 font-medium cursor-pointer group"
                >
                  <span className="text-[#7c5cfc] group-hover:text-white transition-colors font-bold">+</span> {kw}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}