import { useState } from 'react';
import { extractKeywords } from '../../utils/aiApi';

const KeywordExtractor = ({ onAddSkill }) => {
  const [jobDesc, setJobDesc] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
      <h3 className="font-semibold text-purple-800 mb-2 text-sm">
        AI Keyword Extractor
      </h3>

      <p className="text-xs text-purple-600 mb-3">
        Paste a job description and AI will suggest relevant keywords
      </p>

      <textarea
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        placeholder="We are looking for a React developer with Node.js experience..."
        rows={3}
        className="w-full border border-purple-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 resize-none mb-2"
      />

      <button
        onClick={handleExtract}
        disabled={loading || !jobDesc.trim()}
        className="w-full bg-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition disabled:opacity-50"
      >
        {loading ? 'AI Processing...' : 'Extract Keywords'}
      </button>

      {error && (
        <p className="text-red-500 text-xs mt-2">{error}</p>
      )}

      {keywords.length > 0 && (
        <div className="mt-3">
          <p className="text-xs text-purple-600 mb-2">
            Click a keyword to add it to Skills:
          </p>

          <div className="flex flex-wrap gap-2">
            {keywords.map((kw, i) => (
              <button
                key={i}
                onClick={() => onAddSkill && onAddSkill(kw)}
                className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs hover:bg-purple-600 hover:text-white transition"
              >
                + {kw}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default KeywordExtractor;