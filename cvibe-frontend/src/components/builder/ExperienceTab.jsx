const ExperienceTab = ({ data, onChange }) => {
  const experiences = data?.experience || [];

  const addExp = () => {
    onChange({
      ...data,
      experience: [...experiences, { company: '', position: '', duration: '', description: '' }]
    });
  };

  const updateExp = (index, field, value) => {
    const updated = experiences.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    onChange({ ...data, experience: updated });
  };

  const removeExp = (index) => {
    onChange({ ...data, experience: experiences.filter((_, i) => i !== index) });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-700">Experience</h3>
        <button onClick={addExp}
          className="bg-purple-600 text-white text-sm px-3 py-1 rounded-lg hover:bg-purple-700 transition">
          + Add
        </button>
      </div>
      {experiences.map((exp, i) => (
        <div key={i} className="border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">Experience {i + 1}</span>
            <button onClick={() => removeExp(i)} className="text-red-500 text-xs hover:underline">Remove</button>
          </div>
          {['position','company','duration'].map((field) => (
            <input key={field} type="text"
              value={exp[field] || ''}
              onChange={(e) => updateExp(i, field, e.target.value)}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
            />
          ))}
          <textarea value={exp.description || ''}
            onChange={(e) => updateExp(i, 'description', e.target.value)}
            placeholder="Description..."
            rows={2}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 resize-none"
          />
        </div>
      ))}
      {experiences.length === 0 && (
        <p className="text-gray-400 text-sm text-center py-4">Click + Add to add experience</p>
      )}
    </div>
  );
};

export default ExperienceTab;