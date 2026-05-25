const EducationTab = ({ data, onChange }) => {
  const educations = data?.education || [];

  const addEdu = () => {
    onChange({ ...data, education: [...educations, { institution: '', degree: '', year: '' }] });
  };

  const updateEdu = (index, field, value) => {
    const updated = educations.map((edu, i) => i === index ? { ...edu, [field]: value } : edu);
    onChange({ ...data, education: updated });
  };

  const removeEdu = (index) => {
    onChange({ ...data, education: educations.filter((_, i) => i !== index) });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-700">Education</h3>
        <button onClick={addEdu} className="px-3 py-1 text-sm text-white transition bg-purple-600 rounded-lg hover:bg-purple-700">+ Add</button>
      </div>
      {educations.map((edu, i) => (
        <div key={i} className="flex flex-col gap-3 p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Education {i + 1}</span>
            <button onClick={() => removeEdu(i)} className="text-xs text-red-500 hover:underline">Remove</button>
          </div>
          {['degree', 'institution', 'year'].map((field) => (
            <input key={field} type="text"
              value={edu[field] || ''}
              onChange={(e) => updateEdu(i, field, e.target.value)}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            />
          ))}
        </div>
      ))}
      {educations.length === 0 && (
        <p className="py-4 text-sm text-center text-gray-400">Click + Add to add education</p>
      )}
    </div>
  );
};

export default EducationTab;