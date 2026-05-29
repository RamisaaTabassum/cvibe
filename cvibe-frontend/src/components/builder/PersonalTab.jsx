const PersonalTab = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value
      }
    });
  };

  const fields = [
    { key: 'name', label: 'Full Name', placeholder: 'Your Name' },
    { key: 'title', label: 'Professional Title', placeholder: 'Web Developer' },
    { key: 'email', label: 'Email', placeholder: 'you@example.com' },
    { key: 'phone', label: 'Phone', placeholder: '01700000000' },
    { key: 'location', label: 'Location', placeholder: 'Dhaka, Bangladesh' },
  ];

  return (
    <div className="flex flex-col gap-4 text-[#f0f0f8]">

      {/* Title */}
      <h3 className="font-semibold text-gray-200">
        Personal Information
      </h3>

      {/* Fields */}
      {fields.map((f) => (
        <div key={f.key}>
          <label className="block mb-1 text-sm font-medium text-gray-400">
            {f.label}
          </label>

          <input
            type="text"
            value={data?.personalInfo?.[f.key] || ''}
            onChange={(e) => handleChange(f.key, e.target.value)}
            placeholder={f.placeholder}
            className="w-full px-3 py-2 text-sm bg-[#111118] border border-gray-700 text-white rounded-lg focus:outline-none focus:border-[#7c5cfc]"
          />
        </div>
      ))}

      {/* Summary */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-400">
          Summary
        </label>

        <textarea
          value={data?.personalInfo?.summary || ''}
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder="Write a short professional summary..."
          rows={4}
          className="w-full px-3 py-2 text-sm bg-[#111118] border border-gray-700 text-white rounded-lg resize-none focus:outline-none focus:border-[#7c5cfc]"
        />
      </div>
    </div>
  );
};

export default PersonalTab;