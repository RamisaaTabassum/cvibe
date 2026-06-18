const EducationTab = ({ data, onChange }) => {
  const educations = data?.education || [];

  const addEdu = () => {
    onChange({ ...data, education: [...educations, { institution: '', degree: '', year: '' }] });
  };

  const updateEdu = (index, field, value) => {
    const updated = educations.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    onChange({ ...data, education: updated });
  };

  const removeEdu = (index) => {
    onChange({ ...data, education: educations.filter((_, i) => i !== index) });
  };

  return (
    <div className="flex flex-col gap-4 text-[#f0f0f8]">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-200">Education</h3>
        <button
          onClick={addEdu}
          className="px-3 py-1 text-sm text-white transition bg-[#7c5cfc] rounded-lg hover:bg-[#6a4ae8] cursor-pointer"
        >
          + Add
        </button>
      </div>

      {educations.map((edu, i) => (
        <div
          key={i}
          className="flex flex-col gap-3 p-4 border border-gray-700 bg-[#111118] rounded-lg"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-400">
              Education {i + 1}
            </span>
            <button
              onClick={() => removeEdu(i)}
              className="text-xs text-red-400 cursor-pointer hover:underline"
            >
              Remove
            </button>
          </div>

          {['degree', 'institution', 'year'].map((field) => (
            <input
              key={field}
              type="text"
              value={edu[field] || ''}
              onChange={(e) => updateEdu(i, field, e.target.value)}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="w-full px-3 py-2 text-sm bg-[#0a0a0f] border border-gray-700 text-white rounded-lg focus:outline-none focus:border-[#7c5cfc]"
            />
          ))}
        </div>
      ))}

      {educations.length === 0 && (
        <p className="py-4 text-sm text-center text-gray-500">
          Click + Add to add education
        </p>
      )}
    </div>
  );
};

export default EducationTab;