import { useState } from 'react';
import { fixGrammar } from '../../utils/aiApi';

const GrammarFixer = ({ text, onApply }) => {
  const [improved, setImproved] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFix = async () => {
    if (!text?.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fixGrammar(text);
      if (res.data?.improved) {
        setImproved(res.data.improved);
      } else {
        setError('No improvement returned');
      }
    } catch (err) {
      setError('AI error — please try again');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (improved && typeof onApply === 'function') {
      onApply(improved);
      setImproved(''); 
    }
  };

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={handleFix}
        disabled={loading || !text?.trim()}
        className={`px-3 py-1 text-xs font-medium transition-all duration-200 rounded-full cursor-pointer
          ${loading || !text?.trim()
            ? 'bg-[#7c5cfc]/50 text-[#f0f5ff]/60 cursor-not-allowed border border-[#7c5cfc]/20'
            : 'bg-[#7c5cfc] text-white hover:bg-[#6441e3] shadow-md shadow-[#7c5cfc]/10'
          }`}
      >
        {loading ? 'AI Fixing...' : '✦ Fix with AI'}
      </button>

      {error && (
        <p className="mt-1 text-xs font-medium text-red-400">{error}</p>
      )}

      {improved && (
        <div className="p-3 mt-3 border border-[#10b981]/30 rounded-xl bg-[#0d1614] relative overflow-hidden animate-fade-in">
          <div className="absolute top-0 right-0 w-[60px] h-[60px] bg-[#10b981]/5 rounded-full blur-[20px] pointer-events-none" />
          
          <div className="relative z-10">
            <p className="mb-1.5 text-[11px] font-bold text-[#10b981] uppercase tracking-wider">
              ✦ AI Improved Version
            </p>

            <p className="text-sm leading-relaxed text-[#e5e7eb] mb-2.5">
              {improved}
            </p>

            <button
              type="button"
              onClick={handleApply}
              className="px-3 py-1 text-xs font-semibold text-white transition-all duration-200 bg-[#10b981] rounded-full hover:bg-[#059669] cursor-pointer shadow-lg shadow-[#10b981]/10"
            >
              Apply Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrammarFixer ;