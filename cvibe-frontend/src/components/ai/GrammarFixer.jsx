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
      setImproved(res.data.improved);
    } catch (err) {
      setError('AI error — please try again');
    } finally {
      setLoading(false);
    }
  };
   return (
    <div className="mt-2">
      <button
        onClick={handleFix}
        disabled={loading || !text?.trim()}
        className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition disabled:opacity-50"
      >
        {loading ? 'AI Fixing...' : 'Fix with AI'}
      </button>

      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}

      {improved && (
        <div className="mt-2 bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-xs text-green-700 mb-1 font-medium">
            AI Improved Version:
          </p>

          <p className="text-sm text-gray-700 leading-relaxed">
            {improved}
          </p>

          <button
            onClick={() => onApply && onApply(improved)}
            className="mt-2 text-xs bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700 transition"
          >
            Apply Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default GrammarFixer;